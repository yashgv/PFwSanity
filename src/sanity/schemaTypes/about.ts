import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'about',
    title: 'About Page',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Page Title',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Bio / Description',
            type: 'array',
            of: [{ type: 'block' }]
        })
    ],
})
