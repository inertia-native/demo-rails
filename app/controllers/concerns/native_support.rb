# Detects whether the request comes from a Hotwire Native web view and exposes
# that to both ERB (via the `native_app?` helper) and Inertia/React (via shared
# props `nativeApp` / `nativeForm`).
module NativeSupport
  extend ActiveSupport::Concern

  included do
    helper_method :native_app?

    inertia_share do
      { nativeApp: native_app?, nativeForm: @native_form || false }
    end
  end

  private

  def native_app?
    request.user_agent.to_s.match?(/Hotwire Native|Turbo Native/)
  end

  # turbo-rails' historical location helpers, plus an Inertia branch. A plain
  # redirect is followed inside Inertia's request and never reaches native; an
  # Inertia location visit is handed to native by inertia-native, and native's
  # built-in rules for these paths pop, refresh or leave the screen.
  def recede_or_redirect_to(url, **options)
    historical_location_or_redirect_to("/recede_historical_location", url, **options)
  end

  def refresh_or_redirect_to(url, **options)
    historical_location_or_redirect_to("/refresh_historical_location", url, **options)
  end

  def resume_or_redirect_to(url, **options)
    historical_location_or_redirect_to("/resume_historical_location", url, **options)
  end

  def historical_location_or_redirect_to(location, url, **options)
    if native_app? && request.inertia?
      inertia_location location
    elsif native_app?
      redirect_to location, **options
    else
      redirect_to url, **options
    end
  end
end
