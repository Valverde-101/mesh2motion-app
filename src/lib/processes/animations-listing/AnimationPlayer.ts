import { type AnimationClip, type AnimationAction } from 'three'
import { UI } from '../../UI'

export class AnimationPlayer {
  private static readonly playback_speed_storage_key = 'mesh2motion-animation-speed'
  private static readonly minimum_playback_speed = 0.1
  private static readonly maximum_playback_speed = 2

  private readonly ui: UI
  private current_animation_clip: AnimationClip | null = null
  private current_animation_actions: AnimationAction[] = []
  private is_playing: boolean = false
  private last_displayed_frame: number = -1
  /// When the user grabs the scrubber, the animation is paused.
  /// If it was playing before the scrubber was grabbed, it will
  /// resume playing after the user lets go.
  private was_playing_before_user_scrubbed: boolean = false
  private is_user_scrubbing: boolean = false

  private readonly has_added_event_listeners: boolean = false

  constructor () {
    this.ui = UI.getInstance()

    if (!this.has_added_event_listeners) {
      this.setup_event_listeners()
      this.has_added_event_listeners = true
    }
  }

  private setup_event_listeners (): void {
    // Play/Pause button
    if (this.ui.dom_play_pause_button !== null) {
      this.ui.dom_play_pause_button.addEventListener('click', () => {
        this.toggle_play_pause()
      })
    }

    this.ui.dom_animation_step_back_button?.addEventListener('click', () => { this.step_animation_by_frame(-1) })
    this.ui.dom_animation_step_forward_button?.addEventListener('click', () => { this.step_animation_by_frame(1) })

    if (this.ui.dom_animation_speed_input !== null) {
      this.ui.dom_animation_speed_input.value = AnimationPlayer.get_saved_playback_speed().toFixed(1)
      this.update_speed_label(AnimationPlayer.get_saved_playback_speed())
      this.ui.dom_animation_speed_input.addEventListener('input', () => {
        this.set_playback_speed(Number(this.ui.dom_animation_speed_input?.value))
      })
    }

    // Animation scrubber
    if (this.ui.dom_animation_scrubber !== null) {
      this.ui.dom_animation_scrubber.addEventListener('input', (event) => {
        this.handle_scrubber_input(event)
      })

      this.ui.dom_animation_scrubber.addEventListener('pointerdown', () => {
        this.was_playing_before_user_scrubbed = this.is_playing
        this.pause()
        this.is_user_scrubbing = true
      })

      const finish_scrubbing = (): void => {
        if (!this.is_user_scrubbing) {
          return
        }
        this.is_user_scrubbing = false
        if (this.was_playing_before_user_scrubbed) {
          this.was_playing_before_user_scrubbed = false
          this.play()
        }
      }

      window.addEventListener('pointerup', finish_scrubbing)
      window.addEventListener('pointercancel', finish_scrubbing)
    }
  }

  public static get_saved_playback_speed (): number {
    try {
      const saved_value = window.localStorage.getItem(AnimationPlayer.playback_speed_storage_key)
      if (saved_value === null) {
        return 1
      }
      const saved_speed = Number(saved_value)
      if (Number.isFinite(saved_speed)) {
        return Math.min(AnimationPlayer.maximum_playback_speed, Math.max(AnimationPlayer.minimum_playback_speed, saved_speed))
      }
    } catch {
      // Use the default speed when browser storage is unavailable.
    }
    return 1
  }

  public animation_name_clean (input: string): string {
    return input.replace(/_/g, ' ')
  }

  public set_animation (animation_clip: AnimationClip, animation_actions: AnimationAction[]): void {
    this.current_animation_clip = animation_clip
    this.current_animation_actions = animation_actions

    // Calculate total frames (assuming 30 FPS)
    const fps = 30
    const total_frames = Math.max(1, Math.ceil(animation_clip.duration * fps))
    this.last_displayed_frame = -1

    animation_actions.forEach(action => {
      action.timeScale = AnimationPlayer.get_saved_playback_speed()
    })

    // Update UI
    if (this.ui.dom_current_animation_name !== null) {
      this.ui.dom_current_animation_name.textContent = this.animation_name_clean(animation_clip.name)
    }

    if (this.ui.dom_total_time !== null) {
      this.ui.dom_total_time.textContent = `${total_frames}`
    }

    // Enable controls
    if (this.ui.dom_play_pause_button !== null) {
      this.ui.dom_play_pause_button.disabled = false
    }

    if (this.ui.dom_animation_scrubber !== null) {
      this.ui.dom_animation_scrubber.disabled = false
      this.ui.dom_animation_scrubber.max = (total_frames - 1).toString()
      this.ui.dom_animation_scrubber.value = '0'
    }

    if (this.ui.dom_animation_step_back_button !== null) {
      this.ui.dom_animation_step_back_button.disabled = false
    }
    if (this.ui.dom_animation_step_forward_button !== null) {
      this.ui.dom_animation_step_forward_button.disabled = false
    }

    // Set initial playing state based on first animation action
    this.is_playing = animation_actions.length > 0 ? animation_actions[0].isRunning() : false
    this.update_play_pause_button()
  }

  public clear_animation (): void {
    this.current_animation_clip = null
    this.current_animation_actions = []
    this.is_playing = false

    // Update UI
    if (this.ui.dom_current_animation_name !== null) {
      this.ui.dom_current_animation_name.textContent = 'No animation selected'
    }

    if (this.ui.dom_current_time !== null) {
      this.ui.dom_current_time.textContent = '0'
    }

    if (this.ui.dom_total_time !== null) {
      this.ui.dom_total_time.textContent = '0'
    }

    // Disable controls
    if (this.ui.dom_play_pause_button !== null) {
      this.ui.dom_play_pause_button.disabled = true
    }

    if (this.ui.dom_animation_scrubber !== null) {
      this.ui.dom_animation_scrubber.disabled = true
      this.ui.dom_animation_scrubber.value = '0'
    }
    this.last_displayed_frame = -1
    if (this.ui.dom_animation_step_back_button !== null) this.ui.dom_animation_step_back_button.disabled = true
    if (this.ui.dom_animation_step_forward_button !== null) this.ui.dom_animation_step_forward_button.disabled = true

    this.update_play_pause_button()
  }

  public toggle_play_pause (): void {
    if (this.current_animation_actions.length === 0) {
      return
    }

    if (this.is_playing) {
      this.pause()
    } else {
      this.play()
    }
  }

  public play (): void {
    if (this.current_animation_actions.length === 0) {
      return
    }

    // Apply play/unpause to all animation actions
    this.current_animation_actions.forEach((action) => {
      if (action.paused === true) {
        action.paused = false
      } else {
        action.play()
      }
    })

    this.is_playing = true
    this.update_play_pause_button()
  }

  public pause (): void {
    if (this.current_animation_actions.length === 0) {
      return
    }

    // Apply pause to all animation actions
    this.current_animation_actions.forEach((action) => {
      action.paused = true
    })

    this.is_playing = false
    this.update_play_pause_button()
  }

  private set_playback_speed (speed: number): void {
    if (!Number.isFinite(speed)) {
      return
    }

    const clamped_speed = Math.min(AnimationPlayer.maximum_playback_speed, Math.max(AnimationPlayer.minimum_playback_speed, speed))
    try {
      window.localStorage.setItem(AnimationPlayer.playback_speed_storage_key, clamped_speed.toString())
    } catch {
      // Playback speed remains active for this animation if storage is unavailable.
    }

    this.current_animation_actions.forEach(action => {
      action.timeScale = clamped_speed
    })
    this.update_speed_label(clamped_speed)
  }

  private update_speed_label (speed: number): void {
    if (this.ui.dom_animation_speed_value !== null) {
      this.ui.dom_animation_speed_value.value = `${speed.toFixed(1)}×`
    }
  }

  private step_animation_by_frame (frame_delta: number): void {
    if (this.current_animation_clip === null || this.current_animation_actions.length === 0) {
      return
    }

    this.pause()
    const current_frame = this.current_animation_actions[0].time * 30
    const maximum_frame = Math.max(0, Math.ceil(this.current_animation_clip.duration * 30) - 1)
    this.set_animation_frame(Math.min(maximum_frame, Math.max(0, Math.round(current_frame) + frame_delta)))
  }

  private set_animation_frame (frame_number: number): void {
    if (this.current_animation_clip === null) {
      return
    }

    const fps = 30
    const maximum_frame = Math.max(0, Math.ceil(this.current_animation_clip.duration * fps) - 1)
    const clamped_frame = Math.min(maximum_frame, Math.max(0, Math.round(frame_number)))
    const animation_time = Math.min(this.current_animation_clip.duration - Number.EPSILON, clamped_frame / fps)
    this.current_animation_actions.forEach(action => { action.time = animation_time })

    if (this.ui.dom_animation_scrubber !== null) {
      const frame_value = clamped_frame.toString()
      if (this.ui.dom_animation_scrubber.value !== frame_value) {
        this.ui.dom_animation_scrubber.value = frame_value
      }
    }
    if (this.ui.dom_current_time !== null) {
      const frame_value = clamped_frame.toString()
      if (this.ui.dom_current_time.textContent !== frame_value) {
        this.ui.dom_current_time.textContent = frame_value
      }
    }
    this.last_displayed_frame = clamped_frame
  }

  private update_play_pause_button (): void {
    if (this.ui.dom_play_pause_button === null) {
      return
    }

    // Update the play/pause button icon based on the current state
    const icon = this.ui.dom_play_pause_button.querySelector('img')
    if (icon !== null) {
      // swap the img src based on play/pause state
      if (this.is_playing || this.was_playing_before_user_scrubbed) {
        icon.src = '../images/icons/pause.svg'
        icon.alt = 'Pause'
      } else {
        icon.src = '../images/icons/play.svg'
        icon.alt = 'Play'
      }
    }
  }

  private handle_scrubber_input (event: Event): void {
    if (this.current_animation_actions.length === 0 || this.current_animation_clip === null) {
      return
    }

    const target = event.target as HTMLInputElement
    this.set_animation_frame(parseFloat(target.value))
  }

  public update (): void {
    if (this.current_animation_actions.length === 0 || this.current_animation_clip === null || this.is_user_scrubbing) {
      return
    }

    // Use the first action for time tracking (they should all be synchronized)
    const first_action = this.current_animation_actions[0]

    // Convert current time to frame number (assuming 30 FPS)
    const fps = 30
    const current_frame = first_action.time * fps
    const maximum_frame = Math.max(0, Math.ceil(this.current_animation_clip.duration * fps) - 1)
    const displayed_frame = Math.min(maximum_frame, Math.max(0, Math.round(current_frame)))
    const frame_value = displayed_frame.toString()

    // Update scrubber position based on frame number
    if (this.ui.dom_animation_scrubber !== null && this.ui.dom_animation_scrubber.value !== frame_value) {
      this.ui.dom_animation_scrubber.value = frame_value
    }

    // Avoid rewriting the same frame label while the animation is between frames.
    if (displayed_frame !== this.last_displayed_frame) {
      if (this.ui.dom_current_time !== null && this.ui.dom_current_time.textContent !== frame_value) {
        this.ui.dom_current_time.textContent = frame_value
      }
      this.last_displayed_frame = displayed_frame
    }

    // Check if animation has finished and loop it
    if (this.is_playing && first_action.time >= this.current_animation_clip.duration) {
      this.current_animation_actions.forEach((action) => {
        action.time = 0
      })
    }
  }

  public get_is_playing (): boolean {
    return this.is_playing
  }
}
