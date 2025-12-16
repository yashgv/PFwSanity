import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Project Title',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Full Stack', value: 'Full Stack' },
                    { title: 'AI/ML', value: 'AI/ML' },
                    { title: 'Frontend', value: 'Frontend' },
                    { title: 'Backend', value: 'Backend' },
                    { title: 'Mobile', value: 'Mobile' },
                ]
            }
        }),
        defineField({
            name: 'image',
            title: 'Project Image',
            type: 'image',
            options: { hotspot: true }
        }),
        defineField({
            name: 'technologies',
            title: 'Technologies Used',
            type: 'array',
            of: [{ type: 'string' }]
        }),
        defineField({
            name: 'link',
            title: 'Live Link',
            type: 'url',
        }),
        defineField({
            name: 'githubLink',
            title: 'GitHub Link',
            type: 'url',
        })
    ],
})
