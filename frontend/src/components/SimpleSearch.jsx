import {useState, useEffect} from 'react'
import {search} from '../spotify-api'
import {Link} from 'react-router-dom'


const Search = () => {
	const [query, setQuery] = useState('')
	const [artists, setArtists] = useState(null)
	const [tracks, setTracks] = useState(null)

	useEffect(() => {
		if(query!=='')
		{
			search(query.replace(' ', '+'))
			.then(res => {
				setTracks(res.data.tracks.items)
				setArtists(res.data.artists.items)
			})
		}
		else {
			setTracks(null)
			setArtists(null)
		}
	}, [query])


	
	return (
		<div className='pt-24 pb-12'>
			<div>
				<div className='flex flex-col justify-center'>
					<h3 className='text-2xl heading mr-4'>Search</h3>
					<input className='mt-3 text-2xl py-1 w-56 lg:w-64 outline-none bg-transparent border-2 border-gray-600 rounded-full text-gray-400 px-3  focus:border-spotify' type="text" value={query} onChange={(e)=>setQuery(e.target.value)} />
				</div>
				
				{tracks && artists ? 
					<div className=' w-1/2 mt-3'>
						<h3>Artists</h3>
						{artists.map(result => 
							<Link to={`/artist/${result.id}`}>
								<div className='pl-3 text-gray-700 text-sm py-1 text-lg hover:text-white'>{result.name}</div>
							</Link>
					    )}
					    <h3>Tracks</h3>
					    {tracks.map(result => 
							<Link to={`/track/${result.id}`}>
								<div className='pl-3 text-gray-700 text-sm py-1 text-lg hover:text-white'>{result.name}</div>
							</Link>
					    )}

					</div>
					:
				null}
			</div>
		</div>
	)
}

export default Search