import { Component, OnInit, EventEmitter, ElementRef, ViewChild, Output } from '@angular/core';
import { CKEditor5 } from '@ckeditor/ckeditor5-angular';
import * as ClassicEditor from '../../assets/ckeditor.js';
import { EditorService } from '../editor.service'

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	@Output()
	public ready = new EventEmitter<CKEditor5.Editor>();

	@ViewChild('sidebar', { static: true })
	private sidebarContainer?: ElementRef<HTMLDivElement>;

	private licenseKey = 'kllhaVr+Tjpo+ZfvSXQGzxWmYzvRRZsh8mOZTkoDx/DGFDJZFV+b1Oc=';

	public Editor = ClassicEditor;

	public editor?: CKEditor5.Editor;

	public data = this.editorService.getInitialData();

	constructor(private editorService: EditorService) { }

	private appData = this.editorService.getAppData();

	private sidebar = document.createElement('div');

	private boundRefreshDisplayMode = this.refreshDisplayMode.bind(this);

	private boundCheckPendingActions = this.checkPendingActions.bind(this);

	public get editorConfig() {
		return {
			extraPlugins: [
				this.editorService.getLoadSaveIntegration(this.appData)
			],
			sidebar: {
				container: this.sidebar,
			},
			licenseKey: this.licenseKey
		};
	}

	ngOnInit(): void {
	}

	public ngAfterViewInit() {
		if (!this.sidebarContainer) {
			throw new Error('Div container for sidebar was not found');
		}

		this.sidebarContainer.nativeElement.appendChild(this.sidebar);
	}

	public ngOnDestroy() {
		window.removeEventListener('resize', this.boundRefreshDisplayMode);
		window.removeEventListener('beforeunload', this.boundCheckPendingActions);
	}

	public onReady(editor: CKEditor5.Editor) {
		this.editor = editor;
		this.ready.emit(editor);

		// Make the track changes mode the "default" state by turning it on right after the editor initializes.
		this.editor.execute('trackChanges');

		// Prevent closing the tab when any action is pending.
		window.addEventListener('beforeunload', this.boundCheckPendingActions);

		// Switch between inline and sidebar annotations according to the window size.
		window.addEventListener('resize', this.boundRefreshDisplayMode);
		this.refreshDisplayMode();
	}

	private checkPendingActions(domEvt) {
		if (this.editor.plugins.get('PendingActions').hasAny) {
			domEvt.preventDefault();
			domEvt.returnValue = true;
		}
	}

	public showEditorDataInConsole(evt) {
		const editorData = this.editor.data?.get();

		const trackChanges = this.editor.plugins.get('TrackChanges');
		const comments = this.editor.plugins.get('CommentsRepository');

		const suggestionsData = trackChanges.getSuggestions();
		const commentThreadsData = comments.getCommentThreads({
			skipNotAttached: true,
			skipEmpty: true
		});

		console.log('Editor data:');
		console.log(editorData);
		console.log('Suggestions data:');
		console.log(suggestionsData);
		console.log('Comment threads data:');
		console.log(commentThreadsData);

		evt.preventDefault();
	}

	private refreshDisplayMode() {
		const annotations = this.editor.plugins.get('Annotations');
		const sidebarElement = this.sidebarContainer.nativeElement;

		if (window.innerWidth < 1070) {
			sidebarElement.classList.remove('narrow');
			sidebarElement.classList.add('hidden');
			annotations.switchTo('inline');
		}
		else if (window.innerWidth < 1300) {
			sidebarElement.classList.remove('hidden');
			sidebarElement.classList.add('narrow');
			annotations.switchTo('narrowSidebar');
		}
		else {
			sidebarElement.classList.remove('hidden', 'narrow');
			annotations.switchTo('wideSidebar');
		}
	}
}
