import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CKEditor5 } from '@ckeditor/ckeditor5-angular';

import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root'
})
export class EditorService {

	currentUser = this.authService.currentUser;

	private readonly serviceEndPoint: string = 'http://localhost:3000/';

	constructor(private authService: AuthService, private http: HttpClient) { }
	getAppData() {
		return {
			// The ID of the current user.
			userId: this.currentUser.id,
			// Users data.
			users: this.authService.users,
			// Suggestion threads data.
			suggestions: this.getSuggestions(),
			// Comment threads data.
			commentThreads: this.getCommentsThread()
		}
	}

	getInitialData() {
		return `
	<h2>
		Bilingual Personality Disorder
	</h2>
		<figure class="image image-style-side">
			<img src="https://c.cksource.com/a/1/img/docs/sample-image-bilingual-personality-disorder.jpg">
			<figcaption>
				One language, one person.
			</figcaption>
		</figure>
		<p>
			This may be the first time you hear about this made-up disorder but it
			<suggestion id="suggestion-1:user-2" suggestion-type="insertion" type="start"></suggestion>actually<suggestion id="suggestion-1:user-2" suggestion-type="insertion" type="end"></suggestion>
			isn’t so far from the truth. Even the studies that were conducted almost half a century show
			that <strong>the language you speak has more effects on you than you realise</strong>.
		</p>
		<p>
			One of the very first experiments conducted on this topic dates back to 1964.
			<a href="https://www.researchgate.net/publication/9440038_Language_and_TAT_content_in_bilinguals">In the experiment</a>
			designed by linguist Ervin-Tripp who is an
			<suggestion id="suggestion-2:user-1" suggestion-type="deletion" type="start"></suggestion>
			authority<suggestion id="suggestion-2:user-1" suggestion-type="deletion" type="end">
			</suggestion>
			<suggestion id="suggestion-3:user-1" suggestion-type="insertion" type="start"></suggestion>
			expert<suggestion id="suggestion-3:user-1" suggestion-type="insertion" type="end"></suggestion>
			in psycholinguistic and sociolinguistic studies, adults who are bilingual
			in English in French were showed series of pictures and were asked to create 3-minute stories.
			In the end participants emphasized
			drastically different dynamics for stories in English and French.
		</p>
		<p>
			Another ground-breaking experiment which included bilingual Japanese women married to American men
			<suggestion id="suggestion-4:user-1" suggestion-type="deletion" type="start"></suggestion>in San
			Francisco <suggestion id="suggestion-4:user-1" suggestion-type="deletion" type="end">
			</suggestion>were
			asked to complete sentences. The goal of the experiment was to investigate whether or not human
			feelings and thoughts
			are expressed differently in <strong>different language mindsets</strong>.
		</p>
		<suggestion id="suggestion-6:user-2" suggestion-type="formatBlock:698dn3otqzd6" type="start"></suggestion>
		<p>
			Here is a sample from the the experiment:
			<suggestion id="suggestion-6:user-2" suggestion-type="formatBlock:698dn3otqzd6" type="end"></suggestion>
		</p>
		<table>
			<thead>
				<tr>
					<th></th>
					<th>English</th>
					<th>Japanese</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Real friends should</td>
					<td>Be very frank</td>
					<td>Help each other</td>
				</tr>
				<tr>
					<td>I will <suggestion id="suggestion-5:user-2" suggestion-type="formatInline:886cqig6g8rf" type="start"></suggestion>probably<suggestion id="suggestion-5:user-2" suggestion-type="formatInline:886cqig6g8rf" type="end"></suggestion> become</td>
					<td>A teacher</td>
					<td>A housewife</td>
				</tr>
				<tr>
					<td>When there is a conflict with family</td>
					<td>I do what I want</td>
					<td>It's a time of great unhappiness</td>
				</tr>
			</tbody>
		</table>
		<p>
			More recent <a href="https://books.google.pl/books?id=1LMhWGHGkRUC">studies</a> show, the
			language a person speaks affects
			their cognition, behaviour, emotions and hence <strong>their personality</strong>.
			This shouldn’t come as a surprise
			<a href="https://en.wikipedia.org/wiki/Lateralization_of_brain_function">since we already know</a>
			that different regions of the brain become more active depending on the person’s activity at hand.
			Since structure, information and especially <strong>the culture</strong> of languages varies
			substantially and the language a person speaks is an essential element of daily life.
		</p>
	`;
	}

	getLoadSaveIntegration(appData) {
		return class LoadSaveIntegration {
			public editor: CKEditor5.Editor;
			public constructor(editor: CKEditor5.Editor) {
				this.editor = editor;
			}

			public init() {
				const usersPlugin = this.editor.plugins.get('Users');
				const trackChangesPlugin = this.editor.plugins.get('TrackChanges');
				const commentsRepositoryPlugin = this.editor.plugins.get('CommentsRepository');

				// Load the users data.
				for (const user of appData.users) {
					usersPlugin.addUser(user);
				}

				// Set the current user.
				usersPlugin.defineMe(appData.userId);

				// Load the suggestion threads data.
				for (const suggestion of appData.suggestions) {
					trackChangesPlugin.addSuggestion(suggestion);
				}

				// Load the comment threads data.
				for (const commentThread of appData.commentThreads) {
					commentThread.isFromAdapter = true;

					commentsRepositoryPlugin.addCommentThread(commentThread);
				}
			}
		};
	}

	getSuggestions() {
		return [
			{
				id: 'suggestion-1',
				type: 'insertion',
				authorId: 'user-2',
				createdAt: new Date(2019, 1, 13, 11, 20, 48)
			},
			{
				id: 'suggestion-2',
				type: 'deletion',
				authorId: 'user-1',
				createdAt: new Date(2019, 1, 14, 12, 7, 20)
			},
			{
				id: 'suggestion-3',
				type: 'insertion',
				authorId: 'user-1',
				createdAt: new Date(2019, 1, 14, 12, 7, 20)
			},
			{
				id: 'suggestion-4',
				type: 'deletion',
				authorId: 'user-1',
				createdAt: new Date(2019, 1, 15, 8, 44, 1)
			},
			{
				id: 'suggestion-5',
				type: 'formatInline:886cqig6g8rf',
				authorId: 'user-2',
				createdAt: new Date(2019, 2, 8, 10, 2, 7),
				data: {
					commandName: 'bold',
					commandParams: [{ forceValue: true }]
				}
			},
			{
				id: 'suggestion-6',
				type: 'formatBlock:698dn3otqzd6',
				authorId: 'user-2',
				createdAt: new Date(2019, 2, 8, 10, 2, 10),
				data: {
					commandName: 'heading',
					commandParams: [{ value: 'heading2' }],
					ormatGroupId: 'blockName',
					multipleBlocks: false
				}
			}
		]
	}

	getCommentsThread() {
		return [
			{
				threadId: 'suggestion-1',
				comments: [
					{
						commentId: 'comment-1',
						authorId: 'user-1',
						content: '<p>Are you sure it will fit here?</p>',
						createdAt: new Date('09/20/2018 14:21:53')
					},
					{
						commentId: 'comment-2',
						authorId: 'user-2',
						content: '<p>I think so...</p>',
						createdAt: new Date('09/21/2018 08:17:01')
					}
				]
			}
		]
	}

	saveData(editorData: any) {
		this.http.post(this.serviceEndPoint+'editorData', editorData)
	}
}
