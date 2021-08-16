
import {useState} from 'react'
import {getRex} from '../spotify-api'
import {TrackItem} from './utils'


const Mood = () => {
	const moods = [{title: 'Happy', emoji: '😄'},  {title: 'Sad', emoji: '😢'}, {title: 'Energetic', emoji: '💪🏻'}, {title: 'Calm', emoji: '😇'}]
	const allGenres = ['Pop','Rock','Hip-Hop', 'Electronic', 'Indie', 'Metal', 'Punk','Classical',  'Alternative',  'Chill',  'Country',  'Techno']

	const [genre, setGenre] = useState(null)
	const [mood, setMood] = useState(null)
	const [rex, setRex] = useState(null)
	

	const setParams = (m) => {
		let q 
		switch(m)
		{
			case 'Happy':
			{
				q='minValence=0.7'
				break
			}
			case 'Sad':
			{
				q='maxValence=0.4'
				break
			}
			case 'Energetic':
			{
				q='minEnergy=0.75'
				break
			}
			case 'Calm':
			{
				q='maxEnergy=0.5&minValence=0.3'
				break
			}
			default:
			{
				console.log('Impossible 😠')
			}
		}
		setMood({mood: m, features: q})

	}

	const go = () => {
		
		getRex(genre.toLowerCase(), mood.features)
			.then(res => {
				setRex(res.data)
				setTimeout(() => {
					window.scrollBy({top: 300, behavior: 'smooth'})
				}, 300);
			})
	}


	return (
		<div className='py-12'>
			<h2 className='heading text-2xl'>Search by Mood</h2>

			<div className="my-8">
				<h2 className="heading mb-3">Select Mood</h2>
				<div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
					{moods.map(m => 
						<div className={`${mood?.mood===m.title ? 'bg-pink-900' : 'bg-card'} h-20 rounded flex justify-center items-center text-xl cursor-pointer  hover:text-spotify`} key={m.title} onClick={() => setParams(m.title)}>
							<h2>{m.title}</h2>
							<h3>{m.emoji}</h3>
						</div>	
						)}
				</div>
			</div>

			<div className="my-12">
				<h2 className="heading">Select Genre</h2>
				<div className="grid grid-cols-3 gap-3 md:grid-cols-6" >
					{allGenres.map(g => 
						<h2 className={`${genre===g ? 'bg-pink-900' : 'bg-card'} p-3 rounded cursor-pointer hover:text-spotify`} key={g} onClick={() => setGenre(g)}>
							{g}
						</h2>)}
				</div>
			</div>

			<button className='text-center bg-spotify px-4 py-2 rounded-full hover:bg-green-900' onClick={go}>Search</button>

			{rex ?
				<div className='mt-20' >
					<h2 id='rex' className="heading my-4">Here are some tracks you may like</h2>
					{rex.tracks.map(song => 
						<div className='flex items-start'>
							<TrackItem songName={song.name} songArtists={song.artists} songAlbum={song.album.name} picURL={song.album.images[1].url}/>
							<div>
								<a href={song.external_urls.spotify} target='blank'>
									<svg className='transform hover:scale-150 transition-transform duration-300' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path className='fill' d="M0 0h24v24H0z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM10.622 8.415l4.879 3.252a.4.4 0 0 1 0 .666l-4.88 3.252a.4.4 0 0 1-.621-.332V8.747a.4.4 0 0 1 .622-.332z" className='fill-current'/></svg>
								</a>
							</div>
						</div>
						)}
				</div>
				:
				<div className='loading'/>
			}
		</div>
	)
}

export default Mood

