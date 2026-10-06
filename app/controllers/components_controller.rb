class ComponentsController < ApplicationController
  def index
    render inertia: "components/index"
  end

  def new
    render inertia: "components/new"
  end

  def create
    redirect_to component_path(
      first_name: params[:first_name],
      last_name: params[:last_name]
    )
  end

  def show
    render inertia: "components/show", props: {
      first_name: params[:first_name],
      last_name: params[:last_name]
    }
  end

  def alert
    render inertia: "components/alert"
  end

  def button
    render inertia: "components/button"
  end

  def haptic
    render inertia: "components/haptic"
  end

  def menu
    render inertia: "components/menu"
  end

  def overflow
    render inertia: "components/overflow"
  end
end
