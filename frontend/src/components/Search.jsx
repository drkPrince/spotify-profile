import React, {useState, useEffect} from 'react'
import {search} from '../spotify-api'
import {Link} from 'react-router-dom'


const Search = () => {
	const [query, setQuery] = useState('')
	const [results, setResults] = useState([])

	useEffect(() => {
		if(query!=='')
		{
			search(query.replace(' ', '+'))
			.then(res => setResults(res.data.artists.items))
		}
	}, [query])


	
	return (
		<div className='py-24 min-h-screen'>
			<div>
				<div className='flex flex-col justify-center'>
					<h3 className='text-5xl heading mr-4'>Search</h3>
					<input className='mt-3 text-2xl py-1 w-56 lg:w-64 outline-none bg-transparent border-2 border-blue-800 rounded-full text-gray-400 px-3' type="text" value={query} onChange={(e)=>setQuery(e.target.value)} />
				</div>
				
				<div className=' w-1/2 mt-3'>
					{results.map(result => 
						<Link to={`/artist/${result.id}`}>
							<div className='pl-3 text-gray-700 text-sm py-1 text-lg'>{result.name}</div>
						</Link>
				    )}
				</div>
			</div>
		</div>
	)
}

export default Search