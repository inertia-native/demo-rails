class ModalsController < ApplicationController
  def new
    render inertia: "modals/new"
  end

  def show
    render inertia: "modals/show"
  end

  def replace
    render inertia: "modals/replace"
  end

  def recede
    recede_or_redirect_to root_path
  end

  def refresh
    refresh_or_redirect_to new_modal_path
  end

  def resume
    resume_or_redirect_to new_modal_path
  end
end
