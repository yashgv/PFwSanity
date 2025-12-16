import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'achievement',
    title: 'Achievement',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Achievement Title',
            type: 'string',
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Publication', value: 'publication' },
                    { title: 'Hackathon', value: 'hackathon' },
                    { title: 'Academic', value: 'academic' },
                    { title: 'Leadership', value: 'leadership' },
                    { title: 'Other', value: 'other' },
                ]
            }
        }),
        defineField({
            name: 'date',
            title: 'Date',
            type: 'date',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
        defineField({
            name: 'image',
            title: 'Image/Certificate',
            type: 'image',
            options: { hotspot: true }
        })
    ],
    orderings: [
        {
            title: 'Date Desc',
            name: 'dateDesc',
            by: [
                { field: 'date', direction: 'desc' }
            ]
        }
    ]
})
