import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'contact',
    title: 'Contact Page Info',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Page Title',
            type: 'string',
        }),
        defineField({
            name: 'intro',
            title: 'Intro Text',
            type: 'text',
        }),
        defineField({
            name: 'email',
            title: 'Contact Email (if different from global)',
            type: 'string',
        })
    ],
})
