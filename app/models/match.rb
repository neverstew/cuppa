class Match < ApplicationRecord
  belongs_to :user_a, class_name: "User"
  belongs_to :user_b, class_name: "User"

  enum relationship: [:dismissed, :matched]
end
