/**
 * watchMedia.js
 *
 * Description: Use watchMedia() to enable/disable code under specific media query conditions with javascript.
 * Author:      Matt Milburn
 * Version:     1.0.0
 * License:     MIT
 * Website:     https://github.com/mattmilburn/watch-media
 */

let _store = {};

export const _noop = () => null;
export const _defaultConfig = { on: _noop, off: _noop };

export function _addEntry( config ) {
  const { id, mediaKey } = config;

  _store[ mediaKey ]._entries[ id ] = config;

  return _store[ mediaKey ]._entries[ id ];
}

export function _getMediaKey( query ) {
  const mq = window.matchMedia( query );
  const { media: mediaKey } = mq;

  if ( ! _store.hasOwnProperty( mediaKey ) ) {
    _store[ mediaKey ] = {
      _mq: mq,
      _isEnabled: false,
      _entries: {},
    };

    _store[ mediaKey ]._mq.addListener( _onMediaQuery );
  }

  return mediaKey;
}

export function _onMediaQuery( mq ) {
  const method = mq.matches ? 'on' : 'off';
  const isEnabled = _store[ mq.media ]._isEnabled;
  const entries = Object.entries( _store[ mq.media ]._entries );

  if ( mq.matches !== isEnabled ) {
    _store[ mq.media ]._isEnabled = mq.matches;

    entries.forEach( ( [ id, config ] ) => config[ method ]( config ) );
  }
}

export function triggerMedia() {
  Object.entries( _store ).forEach( ( [ mediaKey, entry ] ) => _onMediaQuery( entry._mq ) );
}

export function unwatchMedia( id, mediaKey ) {
  if ( _store.hasOwnProperty( mediaKey ) ) {
    const isEnabled = _store[ mediaKey ]._isEnabled;

    if ( _store[ mediaKey ]._entries.hasOwnProperty( id ) ) {
      const config = _store[ mediaKey ]._entries[ id ];
      const { on, off } = config;

      if ( isEnabled ) {
        off( config );
      }

      delete _store[ mediaKey ]._entries[ id ];
    }

    if ( Object.entries( _store[ mediaKey ] ).length === 0 ) {
      _store[ mediaKey ]._mq.removeListener( _onMediaQuery );
      delete _store[ mediaKey ];
    }
  }
}

export function watchMedia( id, query, config ) {
  const mediaKey = _getMediaKey( query );

  const entryConfig = {
    id,
    mediaKey,
    ..._defaultConfig,
    ...config,
  };

  return _addEntry( entryConfig );
}

export default {
  triggerMedia,
  unwatchMedia,
  watchMedia,
};
