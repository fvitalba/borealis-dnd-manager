import Button from './button'

const HostTokenConfig = ({ maps, token, copy, onToggle, selectToken, onTextChange, onIntegerChange, onMapSelect, deleteToken }) => {
	//TODO: Review after refactoring
	return (
		<div className='tokenConfig'>
			<Button title='Duplicate token' value='&#x1f46f;' onClick={ copy.bind(this) } />
			<Button value={ token.pc ? '\u{1f236}' : '\u{1f21a}' } onClick={ onToggle.bind(this, 'pc') } title='pc/npc' />
			<Button value={ token.$selected ? '\u{1f22f}' : '\u{1f233}' } onClick={ selectToken.bind(this, token) } title='(un)select' />
			<Button value={ token.ko ? '\u{1f940}' : '\u{1f339}' } onClick={ onToggle.bind(this, 'ko') } title='alive/dead' />
			<input value={ token.name || '' } placeholder='Name' size='8' onChange={ onTextChange.bind(this, 'name') } />
			<input value={ token.url || '' } placeholder='Url' size='8' onChange={ onTextChange.bind(this, 'url') } />
			wh:
			<input value={ token.w || '' } placeholder='w' className='text2' onChange={ onIntegerChange.bind(this, 'w') } type='number' step='5' min='0' title='width' />
			<input value={ token.h || '' } placeholder='h' className='text2' onChange={ onIntegerChange.bind(this, 'h') } type='number' step='5' min='0' title='height' />
			xy:
			<input value={ token.x || '' } placeholder='x' className='text3' onChange={ onIntegerChange.bind(this, 'x') } type='number' step='5' title='x coord' />
			<input value={ token.y || '' } placeholder='y' className='text3' onChange={ onIntegerChange.bind(this, 'y') } type='number' step='5' title='y coord' />
			<select defaultValue={ token.mapId } onChange={ onMapSelect.bind(this) } title='which map(s)'>
			<option>(all)</option>
			{ Object.keys(maps).map((key, $i) => (
				<option key={ $i } value={ key }>
					{ maps[key].name || maps[key].url || '(unnamed)' }
				</option>
			))}
			</select>
			<Button title='Delete token' value='&#x1f5d1;' onClick={ deleteToken.bind(this) } />
		</div>
	)
}

export default HostTokenConfig