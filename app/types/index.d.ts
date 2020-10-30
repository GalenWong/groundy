interface Song {
	title: string; 
	channel: string; 
	ytID: string;
	downloaded: boolean;
	fileName: string; 	
}; 

interface Playlist {
	id: string;
	name: string; 
	songs: Song[];
}


