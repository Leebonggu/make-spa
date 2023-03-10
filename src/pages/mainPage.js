import { readPosts } from '../api/index.js';
import notFoundPage from './notFoundPage.js';

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
	try {
		const {
			data: { posts },
		} = await readPosts();

		const postList = posts
			.map(
				(post) =>
					`
					<li class='w-full h-[150px] rounded-lg overflow-hidden p-3 flex shadow-lg'>
						<a
							class='w-full flex'
							href='/post/${post.postId}'
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

		return `
			<div class='w-full flex flex-col justify-center items-center pt-[80px]'>
				<ul class='flex flex-col gap-6 w-full'>
					${postList}
				</ul>
			</div>
		`;
	} catch (error) {
		return notFoundPage();
	}
}

export default mainPage;
