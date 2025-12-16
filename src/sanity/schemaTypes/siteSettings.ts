import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Site Title',
            type: 'string',
        }),
        defineField({
            name: 'logo',
            title: 'Logo',
            type: 'image',
            options: {
                hotspot: true
            }
        }),
        defineField({
            name: 'navItems',
            title: 'Navigation Items',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'title', type: 'string', title: 'Title' },
                        { name: 'href', type: 'string', title: 'Link (href)' }
                    ]
                }
            ]
        }),
        defineField({
            name: 'footerText',
            title: 'Footer Copyright Text',
            type: 'string',
        }),
        defineField({
            name: 'socialLinks',
            title: 'Social Links',
            type: 'object',
            fields: [
                { name: 'github', type: 'url', title: 'GitHub URL' },
                { name: 'linkedin', type: 'url', title: 'LinkedIn URL' },
                { name: 'twitter', type: 'url', title: 'Twitter/X URL' },
                { name: 'email', type: 'string', title: 'Email Address' }
            ]
        }),
    ],
})
