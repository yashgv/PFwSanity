import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'experience',
    title: 'Experience',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Job Title',
            type: 'string',
        }),
        defineField({
            name: 'company',
            title: 'Company Name',
            type: 'string',
        }),
        defineField({
            name: 'location',
            title: 'Location',
            type: 'string',
        }),
        defineField({
            name: 'startDate',
            title: 'Start Date',
            type: 'date',
        }),
        defineField({
            name: 'endDate',
            title: 'End Date',
            type: 'date',
        }),
        defineField({
            name: 'current',
            title: 'Is Current Role?',
            type: 'boolean',
            initialValue: false
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
        defineField({
            name: 'technologies',
            title: 'Technologies Used',
            type: 'array',
            of: [{ type: 'string' }]
        }),
        defineField({
            name: 'order',
            title: 'Display Order',
            type: 'number'
        })
    ],
    orderings: [
        {
            title: 'Display Order',
            name: 'orderAsc',
            by: [
                { field: 'order', direction: 'asc' }
            ]
        },
        {
            title: 'Start Date Desc',
            name: 'startDateDesc',
            by: [
                { field: 'startDate', direction: 'desc' }
            ]
        }
    ]
})
