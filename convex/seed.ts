import { Id } from "./_generated/dataModel";
import { mutation } from "./_generated/server";

const DEMO_PROFILES = [
  {
    name: "Leanne Graham",
    age: 25,
    description:
      "Full-time Traveller. Globe Trotter. Occasional Photographer. Part time Singer/Dancer.",
    imageUrl: "https://placehold.co/800x1200/png?text=Leanne+Graham",
  },
  {
    name: "Clementine Bauch",
    age: 26,
    description:
      "Full-time Traveller. Globe Trotter. Occasional Photographer. Part time Singer/Dancer.",
    imageUrl: "https://placehold.co/800x1200/png?text=Clementine+Bauch",
  },
  {
    name: "Ervin Howell",
    age: 27,
    description:
      "Full-time Traveller. Globe Trotter. Occasional Photographer. Part time Singer/Dancer.",
    imageUrl: "https://placehold.co/800x1200/png?text=Ervin+Howell",
  },
  {
    name: "John Lebsack",
    age: 28,
    description:
      "Full-time Traveller. Globe Trotter. Occasional Photographer. Part time Singer/Dancer.",
    imageUrl: "https://placehold.co/800x1200/png?text=John+Lebsack",
  },
  {
    name: "James Dietrich",
    age: 29,
    description:
      "Full-time Traveller. Globe Trotter. Occasional Photographer. Part time Singer/Dancer.",
    imageUrl: "https://placehold.co/800x1200/png?text=James+Dietrich",
  },
  {
    name: "Patricia Schulist",
    age: 30,
    description:
      "Full-time Traveller. Globe Trotter. Occasional Photographer. Part time Singer/Dancer.",
    imageUrl: "https://placehold.co/800x1200/png?text=Patricia+Schulist",
  },
  {
    name: "Chelsey Weissnat",
    age: 31,
    description:
      "Full-time Traveller. Globe Trotter. Occasional Photographer. Part time Singer/Dancer.",
    imageUrl: "https://placehold.co/800x1200/png?text=Chelsey+Weissnat",
  },
  {
    name: "Nicky Runol",
    age: 32,
    description:
      "Full-time Traveller. Globe Trotter. Occasional Photographer. Part time Singer/Dancer.",
    imageUrl: "https://placehold.co/800x1200/png?text=Nicky+Runol",
  },

  {
    name: "Kurtis DuBuque",
    age: 34,
    description:
      "Full-time Traveller. Globe Trotter. Occasional Photographer. Part time Singer/Dancer.",
    imageUrl: "https://placehold.co/800x1200/png?text=Kurtis+DuBuque",
  },
];

export const seedDatabase = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if database is already seeded
    const existingProfiles = await ctx.db.query("profiles").collect();

    if (existingProfiles.length > 0) {
      return { message: "Database already seeded", count: existingProfiles.length };
    }

    // Insert all demo profiles
    const insertedIds: Id<"profiles">[] = [];
    for (const profile of DEMO_PROFILES) {
      const id = await ctx.db.insert("profiles", profile);
      insertedIds.push(id);
    }

    return {
      message: "Database seeded successfully",
      count: insertedIds.length,
      ids: insertedIds,
    };
  },
});

export const clearDatabase = mutation({
  args: {},
  handler: async (ctx) => {
    const profiles = await ctx.db.query("profiles").collect();

    for (const profile of profiles) {
      await ctx.db.delete(profile._id);
    }

    return { message: "Database cleared", deletedCount: profiles.length };
  },
});
