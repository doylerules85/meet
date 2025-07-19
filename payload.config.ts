import sharp from "sharp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { buildConfig } from "payload";
import { s3Storage } from "@payloadcms/storage-s3";
import { resendAdapter } from "@payloadcms/email-resend";

export default buildConfig({
  // If you'd like to use Rich Text, pass your editor here
  editor: lexicalEditor(),
  email: resendAdapter({
    apiKey: process.env.RESEND_API_KEY!,
    defaultFromAddress: "delivered@resend.dev",
    defaultFromName: "TeachTeach",
  }),

  // Define and configure your collections in this array
  collections: [
    {
      slug: "posts",
      fields: [
        {
          name: "slug",
          type: "text",
        },
        {
          name: "title",
          type: "text",
        },
        {
          name: "featuredImage",
          type: "upload",
          relationTo: "media",
        },
        {
          name: "content",
          type: "richText",
          editor: lexicalEditor(),
        },
      ],
    },
    {
      slug: "emails",
      fields: [
        {
          name: "subject",
          type: "text",
        },
        {
          name: "preview",
          type: "text",
        },
        {
          name: "content",
          type: "richText",
          editor: lexicalEditor(),
        },
      ],
    },
    {
      slug: "availability",
      admin: {
        useAsTitle: "title",
        defaultColumns: [
          "title",
          "availabilityType",
          "startDate",
          "endDate",
          "isActive",
        ],
        pagination: {
          defaultLimit: 20,
        },
      },
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
          admin: {
            description:
              "A descriptive title for this availability entry (e.g., 'Vacation Week', 'Morning Meetings')",
          },
        },
        {
          name: "availabilityType",
          type: "select",
          required: true,
          options: [
            {
              label: "Single Day",
              value: "single_day",
            },
            {
              label: "Date Range",
              value: "date_range",
            },
            {
              label: "Recurring Weekly",
              value: "recurring_weekly",
            },
          ],
          admin: {
            description: "Choose the type of availability entry",
          },
        },
        {
          name: "startDate",
          type: "date",
          required: true,
          admin: {
            description: "Start date for this availability period",
          },
        },
        {
          name: "endDate",
          type: "date",
          admin: {
            condition: (data) => data.availabilityType === "date_range",
            description: "End date for date range availability",
          },
        },
        {
          name: "daysOfWeek",
          type: "select",
          hasMany: true,
          options: [
            { label: "Monday", value: "monday" },
            { label: "Tuesday", value: "tuesday" },
            { label: "Wednesday", value: "wednesday" },
            { label: "Thursday", value: "thursday" },
            { label: "Friday", value: "friday" },
            { label: "Saturday", value: "saturday" },
            { label: "Sunday", value: "sunday" },
          ],
          admin: {
            condition: (data) => data.availabilityType === "recurring_weekly",
            description: "Select which days of the week this applies to",
          },
        },
        {
          name: "timeBlocks",
          type: "array",
          minRows: 1,
          admin: {
            description: "Define specific time blocks for this availability",
          },
          fields: [
            {
              name: "startTime",
              type: "text",
              required: true,
              admin: {
                description: "Start time (e.g., '09:00', '14:30')",
                placeholder: "09:00",
              },
              validate: (value: string | null | undefined) => {
                if (!value) return "Start time is required";
                const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
                if (!timeRegex.test(value)) {
                  return "Please enter time in HH:MM format (e.g., 09:00, 14:30)";
                }
                return true;
              },
            },
            {
              name: "endTime",
              type: "text",
              required: true,
              admin: {
                description: "End time (e.g., '17:00', '18:30')",
                placeholder: "17:00",
              },
              validate: (value: string) => {
                if (!value) return "End time is required";
                const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
                if (!timeRegex.test(value)) {
                  return "Please enter time in HH:MM format (e.g., 17:00, 18:30)";
                }
                return true;
              },
            },
            {
              name: "description",
              type: "textarea",
              admin: {
                description: "Optional description for this time block",
                placeholder: "Meeting block, Lunch break, etc.",
              },
            },
          ],
        },
        {
          name: "isUnavailable",
          type: "checkbox",
          defaultValue: true,
          admin: {
            description:
              "Check if this represents times when you are NOT available",
          },
        },
        {
          name: "isActive",
          type: "checkbox",
          defaultValue: true,
          admin: {
            description:
              "Uncheck to temporarily disable this availability entry",
          },
        },
        {
          name: "notes",
          type: "textarea",
          admin: {
            description: "Additional notes or comments about this availability",
          },
        },
        {
          name: "timezone",
          type: "text",
          defaultValue: "UTC",
          admin: {
            description:
              "Timezone for this availability (e.g., 'America/New_York', 'UTC')",
          },
        },
      ],
      hooks: {
        beforeValidate: [
          ({ data }) => {
            // Ensure end date is after start date for date ranges
            if (
              data.availabilityType === "date_range" && data.startDate &&
              data.endDate
            ) {
              const start = new Date(data.startDate);
              const end = new Date(data.endDate);
              if (end <= start) {
                throw new Error("End date must be after start date");
              }
            }

            // Validate time blocks
            if (data.timeBlocks && data.timeBlocks.length > 0) {
              data.timeBlocks.forEach((block: any, index: number) => {
                if (block.startTime && block.endTime) {
                  const [startHour, startMin] = block.startTime.split(":").map(
                    Number,
                  );
                  const [endHour, endMin] = block.endTime.split(":").map(
                    Number,
                  );

                  const startMinutes = startHour * 60 + startMin;
                  const endMinutes = endHour * 60 + endMin;

                  if (endMinutes <= startMinutes) {
                    throw new Error(
                      `Time block ${
                        index + 1
                      }: End time must be after start time`,
                    );
                  }
                }
              });
            }

            return data;
          },
        ],
      },
    },
    {
      slug: "media",
      upload: true,
      fields: [],
      access: {
        read: () => true,
      },
    },
  ],

  plugins: [
    s3Storage({
      collections: {
        media: {
          prefix: "media",
        },
      },
      bucket: process.env.S3_BUCKET!,
      config: {
        forcePathStyle: true, // Important for using Supabase
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
        },
        region: process.env.S3_REGION!,
        endpoint: process.env.S3_ENDPOINT,
      },
    }),
  ],
  // Your Payload secret - should be a complex and secure string, unguessable
  secret: process.env.PAYLOAD_SECRET || "",
  // Whichever Database Adapter you're using should go here
  // Mongoose is shown as an example, but you can also use Postgres
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "",
    },
  }),
  // If you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.
  // This is optional - if you don't need to do these things,
  // you don't need it!
  sharp,
});
