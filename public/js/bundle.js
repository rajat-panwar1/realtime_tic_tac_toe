!(function (e) {
  var t = {};
  function n(r) {
    if (t[r]) return t[r].exports;
    var o = (t[r] = { i: r, l: !1, exports: {} });
    return e[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
  }
  (n.m = e),
    (n.c = t),
    (n.d = function (e, t, r) {
      n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r });
    }),
    (n.r = function (e) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 });
    }),
    (n.t = function (e, t) {
      if ((1 & t && (e = n(e)), 8 & t)) return e;
      if (4 & t && 'object' == typeof e && e && e.__esModule) return e;
      var r = Object.create(null);
      if (
        (n.r(r),
        Object.defineProperty(r, 'default', { enumerable: !0, value: e }),
        2 & t && 'string' != typeof e)
      )
        for (var o in e)
          n.d(
            r,
            o,
            function (t) {
              return e[t];
            }.bind(null, o)
          );
      return r;
    }),
    (n.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return n.d(t, 'a', t), t;
    }),
    (n.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (n.p = ''),
    n((n.s = 0));
})([
  function (e, t, n) {
    'use strict';
    function r(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          'value' in r && (r.writable = !0),
          Object.defineProperty(e, r.key, r);
      }
    }
    n.r(t);
    var o = (function () {
        function e() {
          !(function (e, t) {
            if (!(e instanceof t))
              throw new TypeError('Cannot call a class as a function');
          })(this, e),
            (this.streams = []);
        }
        var t, n, o;
        return (
          (t = e),
          (n = [
            {
              key: 'queue',
              value: function (e, t) {
                var n = [e.toString()];
                return (
                  void 0 !== t &&
                    (Array.isArray(t)
                      ? n.push(t.join(','))
                      : n.push(t.toString())),
                  this.streams.push(n),
                  this
                );
              },
            },
            {
              key: 'output',
              value: function () {
                for (var e = [], t = 0; t < this.streams.length; t++) {
                  var n = this.streams[t];
                  e.push(n.join('-'));
                }
                return this.streams.splice(0, this.streams.length), e.join(';');
              },
            },
          ]) && r(t.prototype, n),
          o && r(t, o),
          e
        );
      })(),
      a = {
        GameStart: 0,
        GameOver: 1,
        GameTied: 2,
        ChangeCell: 3,
        YouAre: 4,
        ChangeTurn: 5,
        WinnerCells: 6,
        FindGame: 7,
        EnemyLeave: 8,
      },
      i = location.origin.replace(/^http/, 'ws'),
      c = new WebSocket(i),
      l = document.querySelector('#game-info'),
      s = document.querySelector('#board'),
      u = document.querySelector('#new-game'),
      d = document.querySelector('#enemy-disconnect'),
      f = document.querySelector('#your-mark'),
      v = !1,
      p = null,
      h = new o();
    function m(e) {
      if (1 == c.readyState && !v) {
        var t = e.target.id.split('-');
        t.shift(), c.send(h.queue(a.ChangeCell, parseInt(t[0])).output());
      }
    }
    (c.onopen = function () {
      console.log('Connected'),
        (l.textContent = 'Searching for an opponent...');
    }),
      (c.onclose = function () {
        console.log('Disconnected');
      }),
      (c.onerror = function () {
        console.log('Failed to connect to the server'),
          (l.textContent = 'Failed to connect to the server');
      }),
      (c.onmessage = function (e) {
        for (var t = e.data.split(';'), n = 0; n < t.length; n++) {
          var r = t[n].split('-');
          switch (parseInt(r[0])) {
            case a.GameStart:
              f.classList.remove('hidden'),
                l.classList.add('text-right'),
                s.classList.remove('hidden');
              break;
            case a.ChangeTurn:
              var o = parseInt(r[1]);
              l.textContent =
                p == o
                  ? 'Your turn!'
                  : ''.concat(1 == o ? 'X' : 'O', "'s turn!");
              break;
            case a.ChangeCell:
              var i = r[1].split(','),
                c = parseInt(i[0]),
                h = parseInt(i[1]);
              document.querySelector('#cell-'.concat(c)).textContent =
                1 == h ? 'X' : 'O';
              break;
            case a.GameOver:
              (l.textContent = (1 == parseInt(r[1]) ? 'X' : 'O') + ' won!'),
                u.classList.remove('hidden'),
                (v = !0);
              break;
            case a.EnemyLeave:
              d.classList.remove('hidden'), (v = !0);
              break;
            case a.GameTied:
              (l.textContent = 'Tie!'), u.classList.remove('hidden'), (v = !0);
              break;
            case a.YouAre:
              (p = parseInt(r[1])),
                (f.textContent = "You're the ".concat(1 == p ? 'X' : 'O'));
              break;
            case a.WinnerCells:
              var m = r[1].split(','),
                y = !0,
                g = !1,
                b = void 0;
              try {
                for (
                  var S, C = m[Symbol.iterator]();
                  !(y = (S = C.next()).done);
                  y = !0
                ) {
                  var x = S.value;
                  document
                    .querySelector('#cell-'.concat(x))
                    .classList.add('cell-winner');
                }
              } catch (e) {
                (g = !0), (b = e);
              } finally {
                try {
                  y || null == C.return || C.return();
                } finally {
                  if (g) throw b;
                }
              }
          }
        }
      });
    var y = !0,
      g = !1,
      b = void 0;
    try {
      for (
        var S, C = document.querySelectorAll('.cell')[Symbol.iterator]();
        !(y = (S = C.next()).done);
        y = !0
      ) {
        S.value.addEventListener('click', m);
      }
    } catch (e) {
      (g = !0), (b = e);
    } finally {
      try {
        y || null == C.return || C.return();
      } finally {
        if (g) throw b;
      }
    }
    u.addEventListener('click', function (e) {
      (p = null),
        (v = !1),
        s.classList.add('hidden'),
        f.classList.add('hidden'),
        l.classList.remove('text-right'),
        (l.textContent = 'Searching for an opponent...'),
        d.classList.add('hidden'),
        h.output();
      for (var t = 0; t < 9; t++) {
        var n = document.querySelector('#cell-'.concat(t));
        n.classList.remove('cell-winner'), (n.textContent = '');
      }
      this.classList.add('hidden'), c.send(h.queue(a.FindGame).output());
    });
  },
]);
