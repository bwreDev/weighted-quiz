export default {
  name: 'questions',
  title: 'Questions',
  type: 'document',
  fields: [
    {
      name: 'question',
      title: 'Question',
      type: 'string',
    },
    {
      type: 'string',
      name: 'type',
      title: 'Question type',
      options: {
        list: [
          { title: 'Radio', value: 'radio' },
          { title: 'Checkbox', value: 'checkbox' },
        ],
      },
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
    },
    {
      name: 'imageAlt',
      title: 'Image Alt Text',
      type: 'string',
    },
    {
      name: 'imageAttribution',
      title: 'Image Attribution',
      type: 'string',
    },
    {
      name: 'answers',
      title: 'Answers',
      type: 'array',
      of: [
        {
          title: 'Answer',
          name: 'answer',
          type: 'object',
          fields: [
            {
              type: 'string',
              name: 'answerBody',
              title: 'Answer Body Text',
            },
            {
              type: 'number',
              name: 'skilledCategoryWeight',
              title: 'Skilled Category Weight',
            },
            {
              type: 'number',
              name: 'serviceCategoryWeight',
              title: 'Service Category Weight',
            },
            {
              type: 'number',
              name: 'engineerCategoryWeight',
              title: 'Engineer Category Weight',
            },
            {
              type: 'number',
              name: 'digitalCategoryWeight',
              title: 'Digital Category Weight',
            },
            {
              type: 'number',
              name: 'corporateCategoryWeight',
              title: 'Corporate Category Weight',
            },
          ],
        },
      ],
    },
  ],
};
