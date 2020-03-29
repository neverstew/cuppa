module MatchesHelper
  def as_react_prop(match)
    avatar = rails_blob_url(match.avatar) if match.avatar.attached?

    OpenStruct.new(match: match, avatar: avatar)
  end
end
