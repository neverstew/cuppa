class User < ApplicationRecord
  include Locateable
  
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  enum role: [:seeker, :helper]

  has_one_attached :avatar
  
  validates_presence_of :role

  scope :available, -> { where.not(name: nil, location: nil, completed_onboarding_at: nil) }
end
