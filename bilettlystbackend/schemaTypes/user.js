export const user = {
  name: 'user',
  title: 'Bruker',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Navn',
      type: 'string',
    },
    {
      name: 'gender',
      title: 'Kjønn',
      type: 'string',
      options: {
        list: ['Mann', 'Kvinne'],
        layout: 'radio',
      },
    },
    {
      name: 'age',
      title: 'Alder',
      type: 'number',
    },
    {
      name: 'profileImage',
      title: 'Profilbilde',
      type: 'image',
    },
    {
      name: 'previousPurchases',
      title: 'Tidligere kjøp',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'event'}]}],
    },
    {
      name: 'wishlist',
      title: 'Ønskeliste',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'event'}]}],
    },
  ],
}
