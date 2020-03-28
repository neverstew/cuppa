class AddCompletedOnboardingAtToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :completed_onboarding_at, :timestamp
  end
end
