import { useRouter } from 'next/router';
import { useState } from 'react';

import { gql } from '../../utils/gql';

function Page() {
    const router = useRouter();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        await gql
            .mutation({
                createPost: [
                    {
                        title,
                        content,
                    },
                    {
                        id: true,
                    },
                ],
            })
            .then((response) => {
                router.push('/');
            })
            .catch((error) => console.log(error.message));
    };

    return (
        <div>
            <h1>New post</h1>
            <form onSubmit={handleSubmit}>
                <p>
                    <label htmlFor="title">Title</label>
                    <input name="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </p>
                <p>
                    <label htmlFor="content">Content</label>
                    <input name="content" value={content} onChange={(e) => setContent(e.target.value)} />
                </p>

                <button type="submit" disabled={title === ''}>
                    Create post
                </button>
            </form>
        </div>
    );
}

Page.auth = true;

export default Page;
