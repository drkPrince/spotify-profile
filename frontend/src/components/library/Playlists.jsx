import {useState, useEffect} from 'react'

import {getUsersPlaylists} from '../../spotify-api'
import {DoubleCard} from '../utils'
import {Link} from 'react-router-dom'



const Playlists = () => {

	const [playlists, setPlaylists] = useState(null)

	useEffect(() => 
	{
		getUsersPlaylists().then(res => setPlaylists(res.data))
	}, [])

	return (
		<div>
			<h3 className='text-2xl heading'>Your Playlists</h3>
			{playlists ? 
				<div className='grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5'>
					{playlists.items.map(playlist => 
						<Link to={`/library/playlist/${playlist.id}`} key={playlist.id}>
							<DoubleCard imageURL={playlist.images[0].url} itemName={playlist.name} subItem={`${playlist.tracks.total} tracks`}/>
						</Link>
					)}
				</div>
			: <div className='loader'>Loading, Please Wait</div>}
		</div>
	)
}


export default Playlists