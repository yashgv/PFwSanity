import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'service',
    title: 'Service',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Service Title',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
        defineField({
            name: 'icon',
            title: 'Icon Name (Lucide React)',
            type: 'string',
        }),
        defineField({
            name: 'features',
            title: 'Features List',
            type: 'array',
            of: [{ type: 'string' }]
        }),
        defineField({
            name: 'popular',
            title: 'Is Popular?',
            type: 'boolean',
            initialValue: false
        })
    ],
})
