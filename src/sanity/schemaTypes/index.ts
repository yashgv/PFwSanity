import { type SchemaTypeDefinition } from 'sanity'
import siteSettings from './siteSettings'
import home from './home'
import about from './about'
import service from './service'
import project from './project'
import experience from './experience'
import achievement from './achievement'
import contact from './contact'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [
        siteSettings,
        home,
        about,
        service,
        project,
        experience,
        achievement,
        contact
    ],
}
