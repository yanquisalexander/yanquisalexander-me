import { NOW, column, defineDb } from 'astro:db';

const Users = {
  columns: {
    id: column.text({primaryKey: true}),
    username: column.text(),
    avatar: column.text()
  }
}

const GuestBook = {
  columns: {
    id: column.number({primaryKey: true}),
    userId: column.text({references: () => Users.columns.id}),
    message: column.text(),
    createdAt: column.date({
      default: NOW
    }),
    updatedAt: column.date({
      default: NOW
    }),
    calification: column.number({
      optional: true
    })
  }
}

// https://astro.build/db/config
export default defineDb({
  tables: {
    Users,
    GuestBook
  }
});
