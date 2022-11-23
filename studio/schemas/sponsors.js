export default {
  name: 'sponsors',
  title: 'Sponsors',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'link',
      title: 'Web Link',
      type: 'url',
    },
    {
      name: 'careers',
      title: 'Sponsor Specific Careers',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'careers' } }],
    },
  ],
};
