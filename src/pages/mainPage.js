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
		<ul>
			${postList}
		</ul>
	`;

	const postList = posts.map(
		(post) =>
			`
			<li>
				<a href=post/${post.postId}>
					<img src=${post.image} width="50px"/>
					<div>${post.title}</div>
					<div>${post.content}</div>
				</a>
			</li>
		`,
	);

	const postListHTML = postListWrapper(postList);

	return postListHTML;
}

export default mainPage;
