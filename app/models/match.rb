class MatchesCountValidator < ActiveModel::Validator
  def validate(record)
    matching_user = record.user_a
    matched_user = record.user_b

    if matching_user.matches.count + matching_user.matched.count > 4 then
      record.errors[:matches] << "#{matching_user.name} cannot have that many matches at once!"
    end

    if matched_user.matches.count + matched_user.matched.count > 4 then
      record.errors[:matches] << "#{matched_user.name} cannot have that many matches at once!"
    end
  end
end

class Match < ApplicationRecord
  belongs_to :user_a, class_name: "User"
  belongs_to :user_b, class_name: "User"

  enum relationship: [:dismissed, :matched]

  validates_with MatchesCountValidator
end
