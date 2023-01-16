import { readPosts } from '../api/index.js';

/**
 *
 * content
 * createdAt
 * image
 * postId
 * title
 * updatedAt
 *
 */

async function mainPage() {
	const {
		data: { posts },
	} = await readPosts();

	const postListWrapper = (postList) => `
		<ul class='flex flex-col gap-6 w-full'>
			${postList}
		</ul>
	`;

	const postList = posts
		.map(
			(post) =>
				`
			<li class='w-full h-[150px] rounded-lg overflow-hidden p-3 flex shadow-lg'>
				<a
					class='w-full flex'
					href=post/${post.postId}
				>
					<img src=${post.image} class='h-full object-fill w-1/5' />
					<div class='w-4/5 py-3 px-4']>
						<div class='text-ellipsis'>${post.title}</div>
						<div class='whitespace-nowrap text-ellipsis overflow-hidden'>${post.content}</div>
					</div>
				</a>
			</li>
		`,
		)
		.join('');

	const postListComponent = postListWrapper(postList);

	return `
		<div class='w-full flex flex-col justify-center items-center pt-[160px]'>
			${postListComponent}
		</div>
	`;
}

export default mainPage;
