export const event = {
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Tittel',
      type: 'string',
    },
    {
      name: 'apiId',
      title: 'API ID',
      type: 'string',
      description: 'ID hentet fra Ticketmaster sitt API',
    },
    {
      name: 'category',
      title: 'Kategori',
      type: 'string',
      options: {
        list: ['Sport', 'Show', 'Festival'],
        layout: 'radio',
      },
    },
  ],
}
