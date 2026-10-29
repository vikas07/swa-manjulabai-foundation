export type GalleryItem = {
  src: string
  alt: string
  category: string
}

export const galleryItems: GalleryItem[] = [
  { src: '/gallery/community-01.jpg', alt: 'Volunteer speaking with elderly community members by the roadside', category: 'Outreach' },
  { src: '/gallery/community-02.jpg', alt: 'Community outreach in progress', category: 'Outreach' },
  { src: '/gallery/community-03.jpg', alt: 'Foundation team with community members', category: 'Outreach' },
  { src: '/gallery/outreach-01.jpg', alt: 'Volunteer giving a gift to a smiling child at a community event', category: 'Children' },
  { src: '/gallery/outreach-02.jpg', alt: 'Night outreach with children and families', category: 'Children' },
  { src: '/gallery/outreach-03.jpg', alt: 'Distribution and support for local families', category: 'Outreach' },
  { src: '/gallery/outreach-04.jpg', alt: 'Community gathering supported by the foundation', category: 'Events' },
  { src: '/gallery/women-01.jpg', alt: 'Women-led community engagement', category: 'Women' },
  { src: '/gallery/women-02.jpg', alt: 'Women participating in foundation programs', category: 'Women' },
  { src: '/gallery/women-03.jpg', alt: 'Women’s event organized by the foundation', category: 'Women' },
  { src: '/gallery/vocational-01.jpg', alt: 'Vocational skill training session', category: 'Skills' },
  { src: '/gallery/vocational-02.jpg', alt: 'Hands-on craft and livelihood training', category: 'Skills' },
  { src: '/gallery/vocational-03.jpg', alt: 'Trainees learning practical skills', category: 'Skills' },
  { src: '/gallery/animal-01.jpg', alt: 'Animal care and rescue support', category: 'Care' },
  { src: '/gallery/animal-02.jpg', alt: 'Wildlife and animal welfare work', category: 'Care' },
  { src: '/gallery/animal-03.jpg', alt: 'Caring for animals in need', category: 'Care' },
  { src: '/gallery/nutrition-02.jpg', alt: 'Nutrition and food support activity', category: 'Nutrition' },
  { src: '/gallery/nutrition-03.jpg', alt: 'Meal and nutrition outreach', category: 'Nutrition' },
  { src: '/gallery/trees-01.jpg', alt: 'Tree planting and greening initiative', category: 'Environment' },
  { src: '/gallery/trees-02.jpg', alt: 'Volunteers planting saplings', category: 'Environment' },
  { src: '/gallery/trees-03.jpg', alt: 'Field plantation work', category: 'Environment' },
  { src: '/gallery/events-01.jpg', alt: 'Community celebration and gathering', category: 'Events' },
  { src: '/gallery/events-02.jpg', alt: 'Foundation event with participants', category: 'Events' },
  { src: '/gallery/events-03.jpg', alt: 'Public program hosted by the foundation', category: 'Events' },
  { src: '/gallery/care-01.jpg', alt: 'Care and support for families in need', category: 'Care' },
  { src: '/gallery/care-02.jpg', alt: 'Healthcare facilitation and care work', category: 'Care' },
  { src: '/gallery/care-03.jpg', alt: 'Compassion in action with beneficiaries', category: 'Care' },
  { src: '/gallery/youth-02.jpg', alt: 'Youth engagement and mentoring', category: 'Youth' },
  { src: '/gallery/youth-03.jpg', alt: 'Young volunteers in the field', category: 'Youth' },
  { src: '/gallery/service-01.jpg', alt: 'Field service and social work', category: 'Service' },
  { src: '/gallery/service-02.jpg', alt: 'On-ground service delivery', category: 'Service' },
  { src: '/gallery/service-03.jpg', alt: 'Team serving the community', category: 'Service' },
  { src: '/gallery/field-01.jpg', alt: 'Field visit documenting foundation work', category: 'Field' },
  { src: '/gallery/field-02.jpg', alt: 'Rural outreach and field programs', category: 'Field' },
  { src: '/gallery/field-03.jpg', alt: 'Community field activity', category: 'Field' },
  { src: '/gallery/field-04.jpg', alt: 'Supporting families in the field', category: 'Field' },
  { src: '/gallery/field-05.jpg', alt: 'Outdoor foundation program', category: 'Field' },
  { src: '/gallery/field-06.jpg', alt: 'Day of service in the community', category: 'Field' },
  { src: '/gallery/field-07.jpg', alt: 'Additional field outreach moment', category: 'Field' },
  { src: '/gallery/field-08.jpg', alt: 'Volunteers working with residents', category: 'Field' },
  { src: '/gallery/field-09.jpg', alt: 'Program delivery on location', category: 'Field' },
  { src: '/gallery/field-10.jpg', alt: 'Foundation presence in the community', category: 'Field' },
  { src: '/gallery/field-11.jpg', alt: 'Closing moments from a field day', category: 'Field' },
]

/** Strong daylight / outreach images for home hero and teasers */
export const heroImage = '/gallery/community-01.jpg'
export const homeTeaserImages = [
  '/gallery/outreach-01.jpg',
  '/gallery/vocational-01.jpg',
  '/gallery/trees-01.jpg',
  '/gallery/care-01.jpg',
] as const
