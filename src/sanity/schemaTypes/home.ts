import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'home',
    title: 'Home Page',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Hero Title',
            type: 'string',
        }),
        defineField({
            name: 'subtitle',
            title: 'Hero Subtitle',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Hero Description',
            type: 'text',
        }),
        defineField({
            name: 'primaryCta',
            title: 'Primary CTA',
            type: 'object',
            fields: [
                { name: 'text', type: 'string', title: 'Text' },
                { name: 'href', type: 'string', title: 'Link' }
            ]
        }),
        defineField({
            name: 'secondaryCta',
            title: 'Secondary CTA',
            type: 'object',
            fields: [
                { name: 'text', type: 'string', title: 'Text' },
                { name: 'href', type: 'string', title: 'Link' }
            ]
        })
    ],
})
