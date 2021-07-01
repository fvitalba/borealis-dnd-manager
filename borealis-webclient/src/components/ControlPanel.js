import React from 'react'
import guid from '../controllers/guid.js'
import Button from '../views/button.js'
import ToolButton from './ToolButton.js'
import ToggleButton from './ToggleButton.js'
import MapConfig from './MapConfig.js'

class TokenConfig extends React.Component {
  update (callback) {
    this.props.game.updateToken(this.props.token, callback);
  }

  delete () {
    const game = this.props.game;
    const tokens = game.state.tokens.map(t => t);
    const index = tokens.indexOf(this.props.token);
    tokens.splice(index, 1);
    game.setState({tokens: tokens});
  }

  copy () {
    const game = this.props.game;
    const copy = Object.assign({}, this.props.token);
    const tokens = game.state.tokens.map(t => t);
    const index = tokens.indexOf(this.props.token);
    tokens.splice(index+1, 0, copy);
    game.setState({tokens: tokens});
  }

  onMapSelect (evt) {
    let value = evt.target.value;
    if (Object.keys(this.props.game.state.maps).indexOf(value) < 0)
      value = undefined;
    this.update(token => token.mapId = value);
  }

  onToggle (key) {
    this.update(token => token[key] = !token[key]);
  }

  onIntegerChange (key, evt) {
    this.update(token => token[key] = parseInt(evt.target.value) || undefined);
  }

  onTextChange (key, evt) {
    this.update(token => token[key] = evt.target.value);
  }

  selectToken (token, evt) {
    this.props.game.selectToken(token, undefined, true);
  }

  render () {
    const token = this.props.token;
    if (!token) return null;
    const game = this.props.game;
    const maps = game.state.maps;
    if (game.isHost)
      return <div className="tokenConfig">
        <Button title="Duplicate token" value="&#x1f46f;" onClick={this.copy.bind(this)} />
        {<Button value={token.pc ? "\u{1f236}" : "\u{1f21a}"} onClick={this.onToggle.bind(this, 'pc')} title="pc/npc" />}
        {<Button value={token.$selected ? "\u{1f22f}" : "\u{1f233}"} onClick={this.selectToken.bind(this, token)} title="(un)select" />}
        {<Button value={token.ko ? "\u{1f940}" : "\u{1f339}"} onClick={this.onToggle.bind(this, 'ko')} title="alive/dead" />}
        <input value={token.name||''} placeholder="Name" size="8" onChange={this.onTextChange.bind(this, 'name')} />
        <input value={token.url||''} placeholder="Url" size="8" onChange={this.onTextChange.bind(this, 'url')} />
        wh:
        <input value={token.w||''} placeholder="w" className="text2" onChange={this.onIntegerChange.bind(this, 'w')} type="number" step="5" min="0" title="width" />
        <input value={token.h||''} placeholder="h" className="text2" onChange={this.onIntegerChange.bind(this, 'h')} type="number" step="5" min="0" title="height" />
        xy:
        <input value={token.x||''} placeholder="x" className="text3" onChange={this.onIntegerChange.bind(this, 'x')} type="number" step="5" title="x coord" />
        <input value={token.y||''} placeholder="y" className="text3" onChange={this.onIntegerChange.bind(this, 'y')} type="number" step="5" title="y coord" />
        <select defaultValue={token.mapId} onChange={this.onMapSelect.bind(this)} title="which map(s)">
          <option>(all)</option>
          {Object.keys(maps).map((key, $i) => (
            <option key={$i} value={key}>
              {maps[key].name || maps[key].url || '(unnamed)'}
            </option>
          ))}
        </select>
        <Button title="Delete token" value="&#x1f5d1;" onClick={this.delete.bind(this)} />
      </div>
    else
      return <div className="tokenConfig">
        <input value={token.name||''} placeholder="Name" size="8" onChange={this.onTextChange.bind(this, 'name')} />
        <input value={token.url||''} placeholder="Url" size="8" onChange={this.onTextChange.bind(this, 'url')} />
        wh:
        <input value={token.w||''} placeholder="w" className="text2" onChange={this.onIntegerChange.bind(this, 'w')} type="number" step="5" min="0" title="width" />
        <input value={token.h||''} placeholder="h" className="text2" onChange={this.onIntegerChange.bind(this, 'h')} type="number" step="5" min="0" title="height" />
        xy:
        <input value={token.x||''} placeholder="x" className="text3" onChange={this.onIntegerChange.bind(this, 'x')} type="number" step="5" title="x coord" />
        <input value={token.y||''} placeholder="y" className="text3" onChange={this.onIntegerChange.bind(this, 'y')} type="number" step="5" title="y coord" />
      </div>
  }
}

class ControlPanel extends React.Component {
  constructor (props) {
    super(props);
    this.state = {fogDiameter: 33};
  }

  get tool () { return this.props.game.state.tool }

  toggleHidden () { this.setState({hidden: !this.state.hidden}) }

  setGameState (key, value) { this.props.game.setState({[key]: value}) }

  setGameInt (key, evt) { debugger; this.props.game.setState({[key]: parseInt(evt.target.value) || undefined}) }

  setGameText (key, evt) { this.props.game.setState({[key]: evt.target.value}) }

  onTextChange (key, evt) { this.setState({[key]: evt.target.value}) }

  createMap () {
    const game = this.props.game;
    const mapsCopy = JSON.parse(JSON.stringify(game.state.maps||{}));
    const mapId = 1 + Object.keys(mapsCopy).reduce((m, x) => Math.max(m, x), 0);
    const newMap = {name: this.state.newMapName, $id: mapId};
    mapsCopy[mapId] = newMap;
    game.setState({maps: mapsCopy});
    this.setState({newMapName: undefined});
  }

  createToken () {
    const game = this.props.game;
    const tokensCopy = JSON.parse(JSON.stringify(game.state.tokens||[]));
    tokensCopy.push({url: this.state.newTokenUrl, guid: guid()});
    game.setState({tokens: tokensCopy});
    this.setState({newTokenUrl: undefined});
    game.websocket.pushTokens(tokensCopy);
  }

  resetFog () { this.props.game.fogRef.current.fill(); }

  setFogOpacity (evt) {
    const newOpacity = evt.target.value;
    if (!isNaN(newOpacity))
      this.props.game.setState({fogOpacity: newOpacity});
  }

  copyJson () {
    const json = this.props.game.toJson();
    window.navigator.clipboard.writeText(json).then(() => {
      this.props.game.notify('copied to clipboard');
    }).catch(err => {
      console.error('failed to write to clipboard: ', err);
      this.props.game.notify(`failed to write to clipboard: ${err}`, 2000);
    });
  }

  pasteJson () {
    const game = this.props.game;
    const note1 = this.props.game.notify('reading clipboard...');
    window.navigator.clipboard.readText().then(json => {
      if (window.confirm(`Do you really want to overwrite this game with what's in your clipboard? ${json.slice(0,99)}...`)) {
        game.fromJson(json);
        game.notify('pasted from clipboard');
      }
      note1 && note1.close();
    }).catch(err => {
      console.error('failed to read clipboard: ', err);
      game.notify(`failed to read clipboard: ${err}`, 2000);
    });
  }

  socketRequestRefresh () {
    this.props.game.websocket.requestRefresh();
  }

  renderToolSelect () {
    return (<span id="tools">
      <ToolButton title="move" value="&#x1f9f3;" cp={this} />
      <ToolButton title="draw" value="&#x1f58d;" cp={this} />
      <ToolButton title="fog"  value="&#x1f32c;" cp={this} />
    </span>)
  }

  renderToolControls () {
    const game = this.props.game;
    switch (this.tool) {
      case 'draw':
        return (<span>
          <Button title="eraser" value="&#x1f9fd;" onClick={this.setGameState.bind(this, 'subtool', 'eraser')} isSelected={game.state.subtool === 'eraser'} />
          <Button title="pencil" value="&#x1f58d;" onClick={this.setGameState.bind(this, 'subtool', 'pencil')} isSelected={game.state.subtool === 'pencil'} />
          <input size="3" title="draw size" value={game.state.drawSize} onChange={this.onTextChange.bind(game, 'drawSize')} type="number" step="3" min="1" />
          <input size="3" title="draw color" value={game.state.drawColor} onChange={this.onTextChange.bind(game, 'drawColor')} />
          <Button style={{backgroundColor: game.state.drawColor}} value="&#x1f58c;" disabled />
        </span>)
      case 'move':
        return null;
      case 'fog':
        return (<span>
          <Button title="reset fog" onClick={this.resetFog.bind(this)} value="&#x1f300;" />
          <input size="3" title="fog radius" value={game.state.fogRadius||0} onChange={this.onTextChange.bind(game, 'fogRadius')} type="number" step="5" min="1" />
          <input size="3" title="fog opacity" step="0.05" min="0" max="1" value={game.state.fogOpacity} onChange={this.setFogOpacity.bind(this)} type="number" />
        </span>);
      default: return null;
    }
  }

  renderMaps () {
    if (!this.state.toggleOnMaps) return null;
    const maps = this.props.game.state.maps;
    const keys = maps && Object.keys(maps);
    return (<div>
      <hr />
      <div>
        <input placeholder="New map name (optional)" onChange={this.onTextChange.bind(this, 'newMapName')} />
        <Button title="Create new map" value="&#x2795;" onClick={this.createMap.bind(this)} />
        {keys && keys.map((mapId, $i) => (
          <MapConfig key={`map${$i}`} mapId={mapId} map={maps[mapId]} game={this.props.game} />
        ))}
      </div>
    </div>)
  }

  renderUser () {
    if (!this.state.toggleOnUser) return null;
    const game = this.props.game;
    return <div>
      <hr />
      <input title="User name" placeholder="User name" value={game.state.username||''} onChange={this.setGameText.bind(this, 'username')} />
      <ToggleButton title="Share mouse (cursor)" value="&#x1f401;" cp={game} />
      <input title="Cursor size" value={game.state.cursorSize||''} onChange={this.setGameInt.bind(this, 'cursorSize')} type="number" min="0" />
      <hr />
      <Button title="Redo as dev" value="&#x1f530;" onClick={game.initAsDev.bind(game)} />
      <Button title="Copy JSON to clipboard" value="&#x1f46f;" onClick={this.copyJson.bind(this)} />
      <Button title="Paste JSON from clipboard" value="&#x1f4cb;" onClick={this.pasteJson.bind(this)} />
    </div>;
  }

  renderTokens () {
    if (!this.props.game.isHost) return null;
    if (this.state.toggleOnTokens)
      return (<div>
        <hr />
        <input placeholder="New token url" onChange={this.onTextChange.bind(this, 'newTokenUrl')} value={this.state.newTokenUrl||''} />
        <Button title="Create new token" value="&#x2795;" onClick={this.createToken.bind(this)} />
        {this.props.game.state.tokens.length}
        {this.props.game.state.tokens.map((token, $i) => (
          <TokenConfig key={`token${$i}`} token={token} game={this.props.game} />
        ))}
      </div>)
    else
      return this.renderSelectedTokensControls();
  }

  renderSelectedTokensControls () {
    const tokens = this.props.game.state.tokens.filter(t => t.$selected);
    return <div>
      {tokens.map((token, $i) => (
        <TokenConfig key={`token${$i}`} token={token} game={this.props.game} />
      ))}
    </div>
  }

  render () {
    const toggleHiddenButton = <Button value="&#x1f441;" onClick={this.toggleHidden.bind(this)} title="show/hide control panel" />;
    if (this.state.hidden)
      return <div id="control-panel">{toggleHiddenButton}</div>
    const game = this.props.game;
    if (game.isHost)
      return <div id="control-panel">
        {toggleHiddenButton}
        |||
        <ToggleButton title="User" value="&#x1f9d9;&#x200d;&#x2642;&#xfe0f;" cp={this} />
        <ToggleButton title="Maps" value="&#x1f5fa;" cp={this} />
        <ToggleButton title="Tokens" value="&#x265f;" cp={this} />
        <Button title="Push refresh to players" value="&#x1f4ab;" onClick={game.websocket.pushRefresh.bind(game.websocket, {})} />
        |||
        {this.renderToolSelect()}
        |||
        {this.renderToolControls()}
        {this.renderMaps()}
        {this.renderTokens()}
        {this.renderUser()}
      </div>;
    else
      return <div id="control-panel">
        {toggleHiddenButton}
        <input title="User name" placeholder="User name" value={game.state.username||''} onChange={this.setGameText.bind(this, 'username')} />
        <ToggleButton title="Share mouse (cursor)" value="&#x1f401;" cp={game} />
        <input title="Cursor size" value={game.state.cursorSize||''} onChange={this.setGameInt.bind(this, 'cursorSize')} type="number" min="0" />
        <Button title="Request gameboard refresh from host" onClick={this.socketRequestRefresh.bind(this)} value="&#x1f4ab;" />
        {this.renderSelectedTokensControls()}
      </div>
  }
}
export default ControlPanel;
