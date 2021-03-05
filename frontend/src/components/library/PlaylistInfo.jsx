import {useState, useEffect} from 'react'
import {getAPlaylistsTracks, getAPlaylist} from '../../spotify-api'
import { useParams, Link } from 'react-router-dom'
import {TrackItem, simplifyDate} from '../utils'


const PlaylistInfo = () => 
{
	const {id} = useParams()
	const [tracks, setTracks] = useState(null)
	const [basics, setBasics] = useState(null)

	useEffect(() => 
	{
		getAPlaylist(id).then(res => setBasics(res.data))
		getAPlaylistsTracks(id).then(res => setTracks(res.data))
	}, [id])

	return (
		<div className=''>
			{tracks && basics ?
				<div>
					<div className='flex items-center mb-8'>
						<div className='w-40 h-40'>
							<img src={basics.images[0].url} alt="" className='object-cover w-full'/>
						</div>
						<div className='ml-4 pr-20'>
							<h2 className='text-white text-lg lg:text-4xl'>{basics.name}</h2>
						</div>
					</div>


					<div className='flex text-gray-700 text-sm tracking-wider mb-4 sticky top-0 pt-8 bg-black border-bottom'>
						<h3 className='w-9/12'>TRACK</h3>
						<h3 className='w-3/12'>ADDED ON</h3>
					</div>

					{tracks.items.map(song => 
						<div className="flex" key={song.id}>
							<div className='w-9/12'>
								<Link to={`/track/${song.track.id}`}>
									<TrackItem songName = {song.track.name} songArtists={song.track.artists} picURL={song.track.album.images[1].url}/>
								</Link>
							</div>
							<div className='w-3/12 text-sm text-gray-600'>{simplifyDate(song.added_at)}</div>
						</div>
					)}	
				</div> 

				: <div className='loader'>Loading, Please Wait</div>}
		</div>
	)
}

export default PlaylistInfo