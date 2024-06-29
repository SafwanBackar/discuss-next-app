'use server';
import { Topic } from '@prisma/client';
import { z } from 'zod';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import paths from '@/paths';
import { db } from '@/db';
const createTopicSchema = z.object({
    name: z
    .string()
    .min(3)
    .regex(/^[a-z-]+$/, {
    message: 'Must be lowercase letters or dashes without spaces',
    }),
    description: z.string().min(10),
});

interface CreateTopicFormState {
    errors: {
        name?: string[]; // error object might or migth not have name key. so we chain it like name?
        description?: string[];
        _form?: string[]; // do not want users not logged in to create topic
    };
}

export async function createTopic(
    formState: CreateTopicFormState,
    formData: FormData
): Promise<CreateTopicFormState> { // Promise<CreateTopicFormState> is defining the type of return of the function.
    await new Promise(resolve=> setTimeout(resolve, 2500)) // just to show loader
    
    const result = createTopicSchema.safeParse({
        name: formData.get('name'),
        description: formData.get('description'),
});

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors, // built in method for flattening error object console result.error
        };
    }
    const session = await auth();
    if (!session || !session.user) {
        return {
            errors: {
                _form: ['You must be signed in to do this.'],
            },
        };
    }
    let topic: Topic;
    try {
        topic = await db.topic.create({
            data: {
                slug: result.data.name,
                description: result.data.description,
            },
        });
    } catch (err: unknown) {
        if (err instanceof Error) {
            return {
                errors: {
                _form: [err.message],
                },
        };
        } else {
            return {
                errors: {
                _form: ['Something went wrong'],
                },
            };
        }
    }

    revalidatePath('/');
    redirect(paths.topicShow(topic.slug));


  // TODO: revalidate the homepage
}