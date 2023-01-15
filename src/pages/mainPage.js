import { readPosts } from '../api/index.js';
import { button } from './common/index.js';

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
	const buttonComponent = button('/upload', '새 글 작성하기');

	const postListWrapper = (postList) => `
		<ul class='flex flex-col gap-6'>
			${postList}
		</ul>
	`;

	const postList = posts
		.map(
			(post) =>
				`
			<li class='w-[328px] h-[76px] border-2 border-gray-200 rounded-lg overflow-hidden'>
				<a
					class='flex'
					href=post/${post.postId}
				>
					<div class='w-[76px] h-[76px]'>
						<img src=${post.image} class='w-full h-full object-fill' />
					</div>
					<div class='w-[252px] py-3 px-4']>
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
	<div class='w-full flex flex-col justify-center items-center'>
		<div class='mt-[20px] mb-8'>
			${buttonComponent}
		</div>
		${postListComponent}
	</div>
	`;
}

export default mainPage;
