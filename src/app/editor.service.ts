import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CKEditor5 } from '@ckeditor/ckeditor5-angular';

import { AuthService } from './auth.service';
import { Observable, Subject, forkJoin } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class EditorService {

	private readonly serviceEndPoint: string = 'http://localhost:3000/';

	constructor(private authService: AuthService, private http: HttpClient) { }

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
		return this.http.get(this.serviceEndPoint + 'suggestions')
	}

	getCommentThreads() {
		return this.http.get(this.serviceEndPoint + 'commentsThread')
	}

	getInitialData() {
		return this.http.get(this.serviceEndPoint + 'editorData')
	}

	saveData(editorData: any): Observable<any> {
		const endpoint = this.serviceEndPoint + 'editorData';
		const payload = {
			data: editorData
		}
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json'
			})
		};
		return this.http.post(endpoint, payload, httpOptions);
	}
}
