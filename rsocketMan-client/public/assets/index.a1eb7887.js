var oe = Object.defineProperty, ce = Object.defineProperties;
var le = Object.getOwnPropertyDescriptors;
var G = Object.getOwnPropertySymbols;
var de = Object.prototype.hasOwnProperty, pe = Object.prototype.propertyIsEnumerable;
var K = (e, a, n) => a in e ? oe(e, a, {enumerable: !0, configurable: !0, writable: !0, value: n}) : e[a] = n,
    h = (e, a) => {
        for (var n in a || (a = {})) de.call(a, n) && K(e, n, a[n]);
        if (G) for (var n of G(a)) pe.call(a, n) && K(e, n, a[n]);
        return e
    }, A = (e, a) => ce(e, le(a));
import {
    a as ue,
    A as Y,
    b as he,
    B as H,
    c as X,
    C as E,
    d as fe,
    D as we,
    e as ge,
    E as ve,
    f as k,
    F as Se,
    g as xe,
    G as Z,
    h as b,
    H as Ie,
    i as C,
    I as v,
    j as Q,
    J as Te,
    k as N,
    K as Ce,
    l as ye,
    L as Re,
    m as Fe,
    M as Ee,
    n as q,
    N as ke,
    o as O,
    O as J,
    p as me,
    P as Me,
    q as P,
    Q as Be,
    R as be,
    r as S,
    s as z,
    S as Ne,
    t as W,
    T as qe,
    u as Ae,
    U as Oe,
    v as d,
    V as Pe,
    w as t,
    x as f,
    y as R,
    z as r
} from "./vendor.4ba90a91.js";

const De = function () {
    const a = document.createElement("link").relList;
    if (a && a.supports && a.supports("modulepreload")) return;
    for (const o of document.querySelectorAll('link[rel="modulepreload"]')) c(o);
    new MutationObserver(o => {
        for (const i of o) if (i.type === "childList") for (const s of i.addedNodes) s.tagName === "LINK" && s.rel === "modulepreload" && c(s)
    }).observe(document, {childList: !0, subtree: !0});

    function n(o) {
        const i = {};
        return o.integrity && (i.integrity = o.integrity), o.referrerpolicy && (i.referrerPolicy = o.referrerpolicy), o.crossorigin === "use-credentials" ? i.credentials = "include" : o.crossorigin === "anonymous" ? i.credentials = "omit" : i.credentials = "same-origin", i
    }

    function c(o) {
        if (o.ep) return;
        o.ep = !0;
        const i = n(o);
        fetch(o.href, i)
    }
};
De();
const Ue = {
    websocketURL: "",
    lifetime: 0,
    rsocket: null,
    status: "CONNECTING",
    error: null,
    dataMimeType: "",
    KeepAlive: 0,
    metadataMimeType: "",
    sessionDuration: 0,
    resumeToken: "",
    useResume: !0,
    clientId: "",
    clientType: ""
}, _ = X({
    name: "connection",
    initialState: Ue,
    reducers: {
        configure: (e, a) => h(h({}, e), a.payload),
        updateRScoketInstance: (e, a) => (a.payload, e.rsocket = a.payload, e)
    }
}), {configure: ee, updateRScoketInstance: $e} = _.actions;
var je = _.reducer;
const Le = [], te = X({
    name: "requestSlice",
    initialState: Le,
    reducers: {
        addRequestItem: (e, a) => (e.unshift(a.payload), e),
        updateRequestItem: (e, a) => (e = e.map(n => n.id === a.payload.id ? h(h({}, n), a.payload) : n), e),
        clearRequests: e => (e.length = 0, e)
    }
}), {addRequestItem: U, updateRequestItem: ae, clearRequests: ze} = te.actions;
var He = te.reducer;
const Je = ue({connection: je, requestSliceReducer: He}), Ve = {key: "root", version: 1, storage: ge}, Ge = me(Ve, Je),
    g = he({reducer: Ge, middleware: e => e({serializableCheck: !1})}), Ke = fe(g), M = (e, a) => {
        switch (a) {
            case"application/json":
                if (!e) return C.Buffer.from("");
                try {
                    e = JSON.stringify(JSON.parse(e))
                } catch {
                }
                break;
            case"text/plain":
                e || (e = ""), typeof e == "string" && (e = e.toString());
                break
        }
        return C.Buffer.from(e)
    }, B = (e, a, n = "") => {
        switch (a) {
            case"application/json":
                if (!e) return C.Buffer.from("");
                try {
                    e = JSON.stringify(JSON.parse(e))
                } catch {
                }
                return b.encodeCompositeMetadata([[b.APPLICATION_JSON, C.Buffer.from(e)], [b.MESSAGE_RSOCKET_ROUTING, b.encodeRoute(n)]]);
            case"text/plain":
                return e || (e = ""), b.encodeCompositeMetadata([[b.TEXT_PLAIN, C.Buffer.from(e)], [b.MESSAGE_RSOCKET_ROUTING, b.encodeRoute(n)]])
        }
    };

async function se() {
    return new Promise((e, a) => {
        const n = g.getState().connection, c = {debug: !0, url: `${n.websocketURL}`, wsCreator: y => new WebSocket(y)},
            o = {
                keepAlive: Number(`${n.KeepAlive}`),
                lifetime: Number(`${n.lifetime}`),
                dataMimeType: `${n.dataMimeType}`,
                metadataMimeType: `${b.MESSAGE_RSOCKET_COMPOSITE_METADATA.string}`,
                payload: {
                    metadata: B(n == null ? void 0 : n.metadata, n.metadataMimeType),
                    data: M(n == null ? void 0 : n.data, n.dataMimeType) ?? ""
                }
            }, i = new Q(c, b.BufferEncoders);
        let s = !1, l;
        const x = new b.RSocketClient({
            setup: o, transport: i, errorHandler: y => {
                s = !0, l = y
            }
        }).connect();
        setTimeout(() => {
            a("\u8FDE\u63A5\u8D85\u65F6")
        }, 5e3), x.subscribe({
            onComplete: y => {
                setTimeout(() => {
                    s ? a(l) : e(y)
                }, 500)
            }, onError: y => {
                a("\u8FDE\u63A5\u9519\u8BEF")
            }, onSubscribe: y => {
            }
        })
    })
}

function ie(e) {
    return new Promise((a, n) => {
        const c = g.getState().connection, o = {debug: !0, url: `${c.websocketURL}`, wsCreator: F => new WebSocket(F)},
            i = C.Buffer.from(c.resumeToken), s = 128, l = 300,
            x = new b.RSocketResumableTransport(() => new Q(o, b.BufferEncoders), {
                bufferSize: s,
                resumeToken: i,
                sessionDurationSeconds: l
            }, b.BufferEncoders), y = {
                keepAlive: Number(`${c.KeepAlive}`),
                lifetime: Number(`${c.lifetime}`),
                dataMimeType: `${c.dataMimeType}`,
                metadataMimeType: `${b.MESSAGE_RSOCKET_COMPOSITE_METADATA.string}`,
                payload: {
                    metadata: B(c == null ? void 0 : c.metadata, c.metadataMimeType),
                    data: M(c == null ? void 0 : c.data, c.dataMimeType) ?? ""
                }
            };
        let p = !0;
        x.connectionStatus().subscribe({
            onNext: F => {
                "" + F.kind, F.kind === "NOT_CONNECTED" && (p ? p = !1 : e || z.error({
                    title: "\u8FDE\u63A5\u5DF2\u65AD\u5F00\uFF0C\u70B9\u51FB\u5237\u65B0\u9875\u9762\u91CD\u65B0\u8FDE\u63A5",
                    onOk: () => {
                        window.location.reload()
                    },
                    closable: !0,
                    maskClosable: !0
                })), F.kind === "CLOSED" && (e ? (k.error("\u8FDE\u63A5\u5DF2\u65AD\u5F00\uFF0C\u8BF7\u68C0\u67E5\u8FDE\u63A5"), n("\u8FDE\u63A5\u9519\u8BEF")) : z.error({
                    title: "\u8FDE\u63A5\u5DF2\u65AD\u5F00\uFF0C\u70B9\u51FB\u5237\u65B0\u9875\u9762\u91CD\u65B0\u8FDE\u63A5",
                    onOk: () => {
                        window.location.reload()
                    },
                    closable: !0,
                    maskClosable: !0
                }))
            }, onSubscribe: F => {
                F.request(Number.MAX_SAFE_INTEGER)
            }, onError: F => {
            }
        });
        let m = !1, u;
        const w = new b.RSocketClient({
            setup: y, transport: x, errorHandler: F => {
                m = !0, u = F
            }
        }).connect();
        setTimeout(() => {
            n("\u8FDE\u63A5\u8D85\u65F6")
        }, 5e3), w.subscribe({
            onSubscribe: F => {
            }, onComplete: F => {
                setTimeout(() => {
                    m ? n(u) : a(F)
                }, 1e3)
            }, onError: F => {
                k.error("\u8FDE\u63A5\u9519\u8BEF\uFF01\uFF01\uFF01"), n("\u8FDE\u63A5\u9519\u8BEF")
            }
        })
    })
}

const Xe = e => {
    const {metadataMimeType: a, dataMimeType: n} = g.getState().connection,
        c = {data: M(e.data, n), metadata: B(e.metadata, a, e.route)}, o = g.getState().connection.rsocket;
    o ? (o.fireAndForget(c), $(e, c)) : k.error("rsocket instance not init yet")
}, Qe = e => {
    const a = g.getState().connection.rsocket, {metadataMimeType: n, dataMimeType: c} = g.getState().connection,
        o = {data: M(e.data, c), metadata: B(e.metadata, n, e.route)};
    if (!a) k.error("rsocket instance not init yet"); else {
        let i;
        a.requestResponse(o).subscribe({
            onComplete: s => {
                var l;
                s = A(h({}, s), {data: (l = s.data) == null ? void 0 : l.toString()}), s = Object.assign(s, {success: !0}), T(e, s, i)
            }, onError: s => {
                let l = {success: !1, data: `${s}`, metadata: ""};
                T(e, l, i)
            }, onSubscribe: s => {
                i = s
            }
        }), $(e, o)
    }
}, We = e => {
    const a = g.getState().connection.rsocket, {metadataMimeType: n, dataMimeType: c} = g.getState().connection,
        o = {data: M(e.data, c), metadata: B(e.metadata, n, e.route)};
    if (!a) k.error("rsocket instance not init yet"); else {
        let i;
        a.requestStream(o).subscribe({
            onNext: s => {
                var l;
                s = A(h({}, s), {data: (l = s.data) == null ? void 0 : l.toString()}), s = Object.assign(s, {success: !0}), T(e, s, i)
            }, onComplete: () => {
            }, onError: s => {
                let l = {success: !1, data: `${s}`, metadata: ""};
                T(e, l, i)
            }, onSubscribe: ({cancel: s, request: l}) => {
                i = s, l(12)
            }
        }), $(e, o)
    }
}, Ye = e => {
    const a = g.getState().connection.rsocket, {metadataMimeType: n, dataMimeType: c} = g.getState().connection,
        o = {data: M(e.data, c), metadata: B(e.metadata, n, e.route)};
    if (!a) k.error("rsocket instance not init yet"); else {
        let i;
        a.requestChannel(xe.Flowable.just(o)).subscribe({
            onNext: s => {
                var l;
                s = A(h({}, s), {data: (l = s.data) == null ? void 0 : l.toString()}), s = Object.assign(s, {success: !0}), T(e, s, i)
            }, onComplete: () => {
            }, onError: s => {
                let l = {success: !1, data: `${s}`, metadata: ""};
                T(e, l, i)
            }, onSubscribe: ({cancel: s, request: l}) => {
                i = s, l(12)
            }
        }), $(e, o)
    }
}, $ = (e, a) => {
    const n = b.decodeCompositeMetadata(a.metadata);
    let c;
    for (let {_content: o, _type: i} of n) i.toString() === "application/json" && (c = o.toString());
    T(e, Object.assign({data: a.data.toString(), metadata: c}, {isSend: !0, success: !0}))
}, T = (e, a, n) => {
    const c = g.getState().requestSliceReducer.find(i => e.id === i.id);
    let o = c == null ? void 0 : c.receive;
    if (a = Object.assign({
        date: new Date().toLocaleTimeString("chinese", {hour12: !1}),
        isSend: !1
    }, a), o = o.length === 0 ? [...o, a] : [a, ...o], h({}, e), (c == null ? void 0 : c.method) !== e.method) {
        n && n();
        return
    }
    g.dispatch(ae(A(h({}, e), {receive: o}))), JSON.stringify(a)
}, ne = e => {
    switch (e.method) {
        case"fireAndForget":
            Xe(e);
            break;
        case"requestResponse":
            Qe(e);
            break;
        case"requestStream":
            We(e);
            break;
        case"requestChannel":
            Ye(e);
            break
    }
};
var j = "/assets/drop-down-arrow.46535627.svg";

function L({formRef: e, field: a, initValue: n}) {
    const c = i => new Promise(s => {
        const l = e.getFieldsValue();
        try {
            l[a] = JSON.stringify(JSON.parse(i))
        } catch {
            l[a] = i
        }
        e.setFieldsValue(l), s("success")
    }), {run: o} = Ae(c, {debounceWait: 300, manual: !0});
    return N(be, {
        className: "custom-codemirror",
        theme: "dark",
        value: n,
        height: "100%",
        extensions: [ye()],
        onChange: (i, s) => {
            o(i)
        }
    })
}

const {Panel: Ze} = E, {Option: I} = R,
    _e = {labelCol: {xs: {span: 32}, sm: {span: 10}}, wrapperCol: {xs: {span: 32}, sm: {span: 14}}},
    et = await window.getBrowserInfo(), tt = ({setIsModalVisible: e}) => {
        const [a] = Fe();
        S.exports.useState(0);
        const [n, c] = S.exports.useState(!1), o = q();
        O(p => p);
        const i = O(p => p.connection), s = {
            websocketURL: i.websocketURL ? i.websocketURL : "ws://127.0.0.1:10081",
            KeepAlive: i.KeepAlive ? i.KeepAlive : 1e6,
            lifetime: i.lifetime ? i.lifetime : 1e6,
            dataMimeType: i.dataMimeType ? i.dataMimeType : "application/json",
            data: i.data ? i.data : "",
            metadataMimeType: i.metadataMimeType ? i.metadataMimeType : "application/json",
            metadata: i.metadata ? i.metadata : "",
            useResume: i.useResume,
            sessionDuration: i.sessionDuration ? i.sessionDuration : 6e3,
            resumeToken: `${P()}`,
            clientId: i.clientId ? i.clientId : et.browserId,
            clientType: i.clientType ? i.clientType : "browser",
            token: i.token ? i.token : "",
            authId: i.authId ? i.authId : "",
        }, l = W(), x = p => {
            c(!0), a.validateFields().then(async m => {
                const wwwa =  {
                    clientId: m.clientId,
                    clientType: m.clientType,
                }
                m.token && (wwwa.token = m.token)
                m.authId && (wwwa.authId = m.authId)
                m = A(h({}, m), {
                    data: JSON.stringify(wwwa)
                }), l(ee(m));
                let u;
                m.useResume ? u = await ie(!1) : u = await se(), l($e(u)), k.success("connect success"), e(!1);
                const w = P();
                g.dispatch(U({
                    id: `${w}`,
                    metadata: "",
                    route: "",
                    data: "",
                    receive: [],
                    isFirstSend: !0,
                    method: "requestResponse",
                    fakeMethod: "get"
                })), o(`/${w}`)
            }).catch(m => {
                console.error(m), k.error("error! check console")
            }).finally(() => {
                c(!1)
            })
        }, y = () => {
            c(!0), a.validateFields().then(async p => {
                const wwwa =  {
                    clientId: p.clientId,
                    clientType: p.clientType,
                }
                p.token && (wwwa.token = p.token)
                p.authId && (wwwa.authId = p.authId)
                p = A(h({}, p), {
                    data: JSON.stringify(wwwa)
                }), l(ee(p)), p.useResume ? await ie(!0) : await se(), k.success("connect success ")
            }).catch(p => {
                k.error("error! check console"), console.error(p)
            }).finally(() => {
                c(!1)
            })
        };
        return d("div", {
            className: "form-data",
            children: [t(we, {delay: 300, tip: "Connecting...", size: "large", spinning: n}), d(f, A(h({form: a}, _e), {
                layout: "horizontal",
                onFinish: x,
                initialValues: s,
                children: [t(f.Item, {
                    name: "websocketURL",
                    required: !0,
                    label: "Websocket URL",
                    rules: [{required: !0, message: "Please input your Websocket URL"}],
                    children: t(v, {placeholder: "eg:ws://127.0.0.1:8080"})
                }), t(f.Item, {
                    name: "metadataMimeType",
                    label: "Metadata",
                    hasFeedback: !0,
                    hidden: !0,
                    rules: [{required: !0, message: "Please select your Metadata type!"}],
                    children: d(R, {
                        suffixIcon: t("img", {css: r`width: 12px`, src: j}),
                        placeholder: "Please select metadataMimeType",
                        children: [t(I, {
                            value: "application/json",
                            children: "JSON - application/json"
                        }), t(I, {value: "text/plain", children: "TEXT - text/plain"})]
                    })
                }), t(f.Item, {
                    hidden: !0,
                    name: "metadata",
                    label: "SetUp Metadata",
                    children: t(L, {initValue: s.metadata, formRef: a, field: "metadata"})
                }), t(f.Item, {
                    name: "dataMimeType",
                    label: "Payload",
                    hidden: !0,
                    hasFeedback: !0,
                    rules: [{required: !0, message: "Please select  dataMimeType!"}],
                    children: d(R, {
                        placeholder: "Please select dataMimeType",
                        suffixIcon: t("img", {css: r`width: 12px`, src: j}),
                        children: [t(I, {
                            value: "application/json",
                            children: "JSON - application/json"
                        }), t(I, {value: "text/plain", children: "TEXT - text/plain"})]
                    })
                }), t(f.Item, {
                    hidden: !0,
                    name: "data",
                    label: "SetUp Payload",
                    children: t(L, {initValue: s.data, formRef: a, field: "data"})
                }), t(f.Item, {
                    name: "clientId",
                    required: !0,
                    label: "ClientId",
                    rules: [{required: !0, message: "Please input your ClientId"}],
                    children: t(v, {placeholder: "eg:xxxxxx"})
                }), t(f.Item, {
                    name: "clientType",
                    required: !0,
                    label: "ClientType",
                    rules: [{required: !0, message: "Please input your clientType"}],
                    children: d(R, {
                        placeholder: "Please select clientType",
                        suffixIcon: t("img", {css: r`width: 12px`, src: j}),
                        children: [t(I, {value: "browser", children: "browser"}), t(I, {
                            value: "android",
                            children: "android"
                        }), t(I, {value: "ios", children: "ios"}), t(I, {value: "api", children: "api"})]
                    })
                }), t(f.Item, {
                    name: "token",
                    required: !1,
                    label: "Token",
                    children: t(v, {placeholder: "eg:xxxxxx"})
                }), t(f.Item, {
                    name: "authId",
                    required: !1,
                    label: "AuthId",
                    children: t(v, {placeholder: "eg:xxxxxx"})
                }), t(E, {
                    bordered: !1,
                    defaultActiveKey: ["0"],
                    expandIcon: ({isActive: p}) => t(Y, {rotate: p ? 90 : 0}),
                    className: "site-collapse-custom-collapse",
                    children: t(Ze, {
                        forceRender: !0,
                        header: "Detail Config",
                        className: "site-collapse-custom-panel",
                        children: d("div", {
                            children: [t(f.Item, {
                                className: "resumeItem",
                                label: "resume",
                                name: "useResume",
                                valuePropName: "checked",
                                children: t(ke, {})
                            }), t(f.Item, {
                                name: "sessionDuration",
                                required: !0,
                                label: "Session Duration",
                                hasFeedback: !0,
                                rules: [{required: !0, message: "Please set Session Duration"}],
                                children: t(v, {type: "number", placeholder: "6000ms"})
                            }), t(f.Item, {
                                name: "resumeToken",
                                required: !0,
                                label: "ResumeToken",
                                hasFeedback: !0,
                                rules: [{required: !0, message: "Please set ResumeToken"}],
                                children: t(v, {type: "string", placeholder: "eg: g2t672389jsae78sj1f"})
                            }), t(f.Item, {
                                name: "KeepAlive",
                                required: !0,
                                label: "KeepAlive interval",
                                hasFeedback: !0,
                                rules: [{required: !0, message: "Please set KeepAlive interval"}],
                                children: t(v, {type: "number", placeholder: "eg:30000ms"})
                            }), t(f.Item, {
                                name: "lifetime",
                                required: !0,
                                label: "KeepAlive  max lifetime",
                                hasFeedback: !0,
                                rules: [{required: !0, message: "Please set lifetime"}],
                                children: t(v, {type: "number", placeholder: "eg:1000"})
                            })]
                        })
                    }, "1")
                }), d("footer", {
                    css: r`
          display: flex;
          flex-direction: row-reverse;
          margin-right: 20px;
        `, children: [t(f.Item, {
                        children: t(H, {
                            css: r`
              width: 120px;
              height: 44px;
              background-color: #7297FC;
              border-radius: 16px;
              border: 0;
              font-family: Poppins, serif;
              font-style: normal;
              font-weight: 600;
              font-size: 14px;
              line-height: 14px;
            `, type: "primary", htmlType: "submit", children: "Connect"
                        })
                    }), t(f.Item, {
                        css: r`margin-right: 24px`, children: t(H, {
                            css: r`
              width: 120px;
              height: 44px;
              background-color: #FF6C87;
              border-radius: 16px;
              border: 0;
              font-family: Poppins, serif;
              font-style: normal;
              font-weight: 600;
              font-size: 14px;
              line-height: 14px;
            `, type: "primary", onClick: () => {
                                y()
                            }, children: "Test"
                        })
                    })]
                })]
            }))]
        })
    };
const at = () => {
    const [e, a] = S.exports.useState(!0);
    return t(Se, {
        children: t(z, {
            title: "Connect Server", centered: !0, visible: e, closeIcon: !0, onOk: () => {
                a(!1)
            }, maskClosable: !1, keyboard: !1, footer: null, children: t(tt, {setIsModalVisible: a})
        })
    })
};
const st = () => d("div", {
    css: r`
          background-color: #252730;
          color: #678FFB;
          font-family: Poppins,serif;
          font-weight: 800;
          display: flex;
          justify-content: space-between;
          padding: 0 20px;
          line-height: 64px;
          height: 64px;
          margin: 0;
        `,
    children: [t("span", {
        css: r`padding-right: 10px;font-size: 26px;`,
        children: "\u{1F977} AsgardMan"
    }), d("span", {
        children: [t("span", {
            css: r`margin-right: 10px`,
            children: t(Z, {
                href: "http://github.com/HaiyaoTec/rsocketMan/issues",
                "data-color-scheme": "no-preference: dark; light: dark; dark: dark;",
                "data-icon": "octicon-issue-opened",
                "aria-label": "Issue HaiyaoTec/rsocketMan on GitHub",
                children: "Issue"
            })
        }), t(Z, {
            href: "http://github.com/HaiyaoTec/rsocketMan",
            "data-show-count": "true",
            "aria-label": "Star HaiyaoTec/rsocketMan on GitHub",
            children: "Star"
        })]
    })]
});
var it = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADnSURBVHgB7Y8xDoIwFIZfUZg9At6AI+ANuIFOGiZwAFdnNAEnhElPgjfQI3gEZwJ9FmOCAWJbF0PClzR5afv/Xwsw0Cu8tHQ2SRnKZBSZywQxQkBXJiMl+IVB8H/BuLnhJ4WFBBwAut4ttRsI4Maoa0oZUoqHva1ePs86foAGQTAJKpmX5gYIldOMjRYrM5vnLUGwUrdA4czGCU9Sl6NeZQKbZXmCl8QeL3iSdjnLdEDgC35cnNgT5mx8IKEzJrtW+zkdTUXKuYKmpPrRO3YXKRcSNCQ1AuXCgpZEsFwa71hE1YKBXvEE1g9thweTMc4AAAAASUVORK5CYII=",
    nt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACxSURBVHgB7ZNBCgIxDEWTOBuP5U30EtOlLmdW4gn0CB7BI3iEHsF9hZqAhYJKErqQgX4YKG3+e5sMQM+iksZxn0I4ejpoHXyGcM4A23fpMszzztIzCWp4VTRJSBsocAbGCh7lTt6aBDV8hbgp94nPVglZ4ThNsbyt+WyVkBfulXwIeBUPGvyXRLqqAIhuXLhq8C8S6d2hJfyTZfk8HXVNW9MF/xcMnmFew1NGfEDPovICP7ljJ7wECnAAAAAASUVORK5CYII=";
const rt = ({index: e, item: a, setDataItem: n}) => t("div", {
    css: r`
        width: 464px;
        background-color: #1f2128;
        margin-bottom: 15px;
        cursor: pointer;
        border-radius: 16px;

        &:hover {
          background-color: #384571;
        }

      `, onClick: () => {
        n(a)
    }, children: d("div", {
        css: r`display: flex`,
        children: [t("div", {
            css: r`display: flex;justify-content: center;align-items: center;padding: 25px 20px`,
            children: t("img", {src: a.isSend ? nt : it, alt: "arrow"})
        }), d("div", {
            css: r`flex: 1`, children: [d("div", {
                css: r`
              display: flex;
              justify-content: space-between;
              padding: 14px 16px 6px 0;
            `, children: [d("span", {
                    children: [t("span", {
                        css: r`
              display: inline-block;
              background-color: #FFFFFF2E;
              margin-right: 10px;
              color: #ffffff;
              width: 17px;
              height: 17px;
              line-height: 17px;
              text-align: center;
              border-radius: 3px;
              font-family: Poppins, serif;
              font-style: normal;
              font-weight: 500;
              font-size: 14px;

            `, children: e
                    }), (a == null ? void 0 : a.success) ? t("span", {
                        css: r`
                color: #2EC13D;
                font-family: Poppins, serif;
                font-weight: 500;
                font-size: 14px;
                line-height: 14px;
              `, children: "OK"
                    }) : t("span", {
                        css: r`
                color: #FB7777;
                font-family: Poppins, serif;
                font-weight: 500;
                font-size: 14px;
                line-height: 14px;
              `, children: "ERROR"
                    })]
                }), t("span", {
                    css: r`
                color: #FFFFFF54;
                font-family: Poppins, serif;
                font-weight: normal;
                font-size: 12px;
                line-height: 12px;
              `, children: a.date
                })]
            }), t("div", {
                css: r`
              display: flex;
              width: 100%;
              justify-content: space-between;
              padding: 6px 16px 14px 0;
              font-weight: bold;
              align-items: center;
            `, children: t("span", {
                    css: r`
            max-width: 190px;
            overflow: hidden;
            color: #ffffff;
            text-overflow: ellipsis;
            white-space: nowrap;
          `,
                    children: (a == null ? void 0 : a.data) === "{}" ? t("span", {
                        css: r`color: #FFFFFF54`,
                        children: "Empty"
                    }) : a == null ? void 0 : a.data
                })
            })]
        })]
    })
}, e);
const {Panel: re} = E, V = e => {
        try {
            return e
        } catch {
            return e
        }
    }, ot = e => {
        try {
            let a = JSON.parse(e);
            return typeof a == "string" || typeof a == "number" ? V(a) : t(ve, {theme: "ashes", src: a})
        } catch {
            return V(e)
        }
    }, ct = ({dataItem: e}) => t("div", {
        css: r`
        background-color: #252730;
        position: sticky;
        top: 0;
        flex: 1;
        padding: 16px;
        min-width: 380px;
      `, children: t("div", {
            className: "datasheet", css: r`position: sticky;
        top: 0`, children: d(E, {
                bordered: !1,
                defaultActiveKey: ["2"],
                expandIcon: ({isActive: a}) => t(Y, {rotate: a ? 90 : 0}),
                className: "site-collapse-custom-collapse",
                children: [t(re, {
                    header: "Metadata", className: "site-collapse-custom-panel", children: t("pre", {
                        css: r`
                margin-top: 16px;
                padding: 0 16px;
                width: 100%;
                height: 200px;
                background-color: #1f2128;
                color: #9a9b9f;
                word-break: break-all;
                font-weight: bold;
              `, children: (e == null ? void 0 : e.metadata) === "" ? "" : V(e == null ? void 0 : e.metadata)
                    })
                }, "1"), t(re, {
                    css: r`margin-top: 16px`,
                    header: "Payload",
                    className: "site-collapse-custom-panel",
                    children: t("pre", {
                        css: r`
                margin-top: 16px;
                padding: 0 16px;
                width: 100%;
                min-height: 300px;
                max-height: 68vh;
                background-color: #1f2128;
                color: #9a9b9f;
                word-break: break-all;
                white-space: break-spaces;
                font-weight: bold;
              `, children: (e == null ? void 0 : e.data) === "" ? "" : ot(e == null ? void 0 : e.data)
                    })
                }, "2")]
            })
        })
    }), {Panel: lt} = E, {Option: D} = R,
    dt = {labelCol: {xs: {span: 5}, sm: {span: 5}}, wrapperCol: {xs: {span: 16}, sm: {span: 16}}}, pt = () => {
        const e = document.querySelector("#sideBar"), a = Ie(), n = q();
        O(u => u.connection);
        const [c, o] = S.exports.useState(null), i = a.requestID;
        let s = O(u => u.requestSliceReducer.find(w => w.id === a.requestID));
        const l = s == null ? void 0 : s.receive;
        S.exports.useEffect(() => {
            m.setFieldsValue(x), o(null)
        }, [s == null ? void 0 : s.method, s == null ? void 0 : s.id]);
        let x = {
            method: s == null ? void 0 : s.fakeMethod,
            route: s == null ? void 0 : s.route,
            metadata: s == null ? void 0 : s.metadata,
            data: s == null ? void 0 : s.data
        };
        const y = {
            fire: "fireAndForget",
            post: "requestResponse",
            get: "requestResponse",
            stream: "requestStream",
            broadcast: "requestChannel"
        }, p = u => {
            if (u.method, u = A(h({}, u), {
                method: y[u.method],
                fakeMethod: u.method,
                metadata: JSON.stringify({method: u.method})
            }), s == null ? void 0 : s.isFirstSend) g.dispatch(ae(A(h({}, u), {
                id: i,
                isFirstSend: !1
            }))), ne(A(h({}, u), {id: i})); else {
                const w = P();
                g.dispatch(U(A(h({}, u), {
                    id: `${w}`,
                    receive: [],
                    isFirstSend: !1
                }))), ne(A(h({}, u), {id: `${w}`})), n(`/${w}`), e.scrollTop = 0
            }
            k.success("message send ")
        }, [m] = f.useForm();
        return t("div", {
            children: s && d("div", {
                css: r`
            display: flex;
            height: 100%;
            border-radius: 3px;
          `, children: [d("div", {
                    css: r`
              display: flex;
              flex-direction: column;
              width: 644px;
              min-width: 644px;
            `, children: [t("div", {
                        css: r`
                flex: 1;
                border: 1px solid #000000;
                border-top: 0;
                display: flex;
                flex-direction: column;
                justify-content: center;
                background-color: #252730;
                border-radius: 3px;
                margin-bottom: 16px;
                padding-top: 40px;
              `, children: d(f, A(h({}, dt), {
                            layout: "horizontal", form: m, onFinish: p, children: [d("div", {
                                className: "custom_box",
                                children: [t(f.Item, {
                                    className: "custom_method_input",
                                    name: "method",
                                    label: "Method",
                                    css: r`font-weight: bold;`,
                                    hasFeedback: !0,
                                    rules: [{required: !0, message: "Please select your method!"}],
                                    children: d(R, {
                                        suffixIcon: t("img", {css: r`width: 12px`, src: j}),
                                        placeholder: "Please select method",
                                        children: [t(D, {value: "fire", children: "Fire"}), t(D, {
                                            value: "post",
                                            children: "Post"
                                        }), t(D, {value: "get", children: "Get"}), t(D, {
                                            value: "stream",
                                            children: "Stream"
                                        }), t(D, {value: "broadcast", children: "Broadcast"})]
                                    })
                                }), t(H, {
                                    className: "custom_submit", type: "primary", htmlType: "submit", css: r`
                      width: 100px;
                      font-weight: bold;
                      background-color: #4ac2dd;
                    `, children: "SEND"
                                })]
                            }), t(f.Item, {
                                name: "route",
                                required: !1,
                                label: "Route",
                                css: r`font-weight: bold;`,
                                children: t(v, {placeholder: "eg: xxx/xxx"})
                            }), t(E, {
                                style: {visibility: "hidden"},
                                bordered: !1,
                                defaultActiveKey: ["0"],
                                expandIcon: ({isActive: u}) => t("span", {
                                    css: r`color: #7699FC;
                    font-weight: 500 !important;
                    font-size: 14px !important;
                    line-height: 22px !important;`, children: "\xA0\xA0\xA0Add Metadata"
                                }),
                                className: "site-collapse-custom-collapse",
                                children: t(lt, {
                                    forceRender: !0,
                                    header: "Metadata:",
                                    className: "metadata-item site-collapse-custom-panel",
                                    children: t(f.Item, {
                                        name: "metadata", label: "", css: r`font-weight: bold;
                      margin-left: 120px;
                      width: 638px`, children: t(L, {formRef: m, field: "metadata", initValue: x.metadata})
                                    })
                                }, "1")
                            }), t(f.Item, {
                                name: "data",
                                label: "Payload",
                                css: r`font-weight: bold;position: relative;top: -22px`,
                                children: t(L, {formRef: m, field: "data", initValue: x.data})
                            })]
                        }))
                    }), d("div", {
                        css: r`
                display: flex;
                background-color: #252730;
                border: 1px solid #000000;
                border-top: 0;
                flex: 1;
              `, children: [t("h2", {
                            css: r`
                  margin-left: 46px;
                  font-weight: bold;
                  font-family: Poppins, serif;
                  line-height: 40px;
                  padding-top: 57px;
                  font-size: 16px;
                  color: #9c9ea2;
                `, children: t("span", {
                                css: r`
                  position: sticky;
                  top: 57px;
                `, children: "Message"
                            })
                        }), t("div", {
                            css: r`display: flex;
                flex-direction: column;
                margin-top: 40px;
                margin-left: 20px;
                margin-right: 40px;
                align-items: flex-end`,
                            children: l == null ? void 0 : l.map((u, w) => t(rt, {
                                item: u,
                                index: l.length - w,
                                setDataItem: o
                            }, w))
                        })]
                    })]
                }), c && t("div", {css: r`margin-left: 16px;flex: 1`, children: t(ct, {dataItem: c})})]
            })
        }, s == null ? void 0 : s.id)
    };
const ut = ({info: e, path: a, sideBarRef: n}) => {
    var o, i, s, l;
    W(), S.exports.useState("");
    let c = q();
    return t("div", {
        className: e.id === a ? "current" : "", css: r`& > :hover {
      background-color: #384571
    }`, children: d("div", {
            css: r`
            width: 100%;
            background-color: #252730;
            padding: 14px;
            border: 1px solid #000000;
            border-left: 0;
            border-right: 0;
            cursor: pointer;
            border-radius: 3px;
          `, onClick: () => {
                c(`/${e.id}`)
            }, children: [d("div", {
                css: r`display: flex;
          justify-content: space-between`, children: [t("span", {
                    css: r`
            line-height: 24px;
            font-size: 16px;
            font-family: Poppins, serif;
            font-style: normal;
            font-weight: 600;
            color: #7699FC;
          `, children: (o = e.fakeMethod) == null ? void 0 : o.replace(/^\S/, x => x.toUpperCase())
                }), t("span", {
                    css: r`
            width: 24px;
            height: 24px;
            font-size: 8px;
            text-align: center;
            line-height: 24px;
            font-weight: bold;
            background-color: ${((i = e == null ? void 0 : e.receive) == null ? void 0 : i.some(x => x.success === !1)) ? "#eb8a93" : "#60be51"};
            color: #FFFFFF;
            border-radius: 50%`, children: e.receive.length < 999 ? e.receive.length : 9 + "..."
                })]
            }), t("div", {
                css: r`
          color: #FFFFFF;
          margin-top: 14px;
          font-weight: bold;
          font-size: 14px`, children: t("span", {children: e.route})
            }), d("div", {
                css: r`padding: 10px 0;
          font-size: 12px;
          display: flex;
          justify-content: space-between`, children: [t("span", {
                    css: r`max-width: 70%;
            display: inline-block;
            color: #FFFFFF54;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;`,
                    children: ((s = e.receive[0]) == null ? void 0 : s.data) === "" ? t("span", {
                        css: r`color: #FFFFFF54`,
                        children: "Empty"
                    }) : (l = e.receive[0]) == null ? void 0 : l.data
                }), t("span", {
                    css: r` color: #7699FC;
                font-weight: bold;
                cursor: pointer;
                font-size: 14px;
              `, onClick: x => {
                        x.preventDefault(), x.stopPropagation();
                        const y = P();
                        n.current.scrollTop = 0, g.dispatch(U(A(h({}, e), {id: y, receive: [], isFirstSend: !0}))), c(y)
                    }, children: "COPY"
                })]
            })]
        })
    })
};
var mt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHJSURBVHgB7ZlNS0JBFIbfMZW+MFu0EyGDSDetgsCVbdob0d+wXavCZSvrH9QyAvdtqo0QtKlFEVER4jLIpA/SaJpz7YIp5MecQS/Ms/IOCs8c3jln5AooorHEFiQygAxjIBFlCLFXfLhaF9FYPFeX9QBSZEV0OvE8uJVtoezzkCwR9sFjWGHTWGHTWGHTWGHT+MFEZHQMB4vLiIyM/1kvfbxi7ewIpfc3cKDuEnGJHikspVsE20EbSB7n0St6kZACXdPLbxrQqnA/0M7wamQGm4kFhALBf79HUdi5vcRh6R46aHeJzOx8W1mCsk4b00VbuJtD18nG2sHahyu1Wstz85oubH24UqsieZJHyB90+jFB/bfyVUUhlWapLsEmTIQCATUg6oOCoINGA4VLlmCLBEk5k04Jkqgr61abC967BA2FxsHQ/MwAq7BzZ/itrFtpJ8cq31ywHjo6YI0xqMt+ghM2YcowdQP3M1FIrTgb4Tx0zF0i2NGaDtoZ7iafHHdibeHs9XlHIjTxcncX0MVz10v7J9Q0Vtg0Vtg0Vtg0XhRWL+28g3rtJb934RUk9odeyk+nE+GpSfVqdE4tDWMgUSmQcrv4eLPxA7JtmRyk5f1SAAAAAElFTkSuQmCC";
const ht = ({requestItems: e}) => {
    let {pathname: a} = Te(), n = q();
    a = a.slice(1);
    const c = S.exports.useRef(null);
    return S.exports.useState(""), d(Ee, {
        id: "sideBar", ref: c, css: r`
          border: 1px solid #000000;
          overflow: auto;

          &::-webkit-scrollbar {
            display: none
          }

          background-color: #252730;
          min-width: 336px !important;
          padding: 0 !important;
        `, children: [d("div", {
            css: r`
        display: flex;
        justify-content: center;
        position: sticky;
        top: 0;
        height: 44px;
        padding: 20px 20px 30px 20px;
        margin-bottom: 40px;
        background-color:#252730;
      `, onClick: () => {
                const o = P();
                c.current.scrollTop = 0, g.dispatch(U({
                    id: o,
                    metadata: "",
                    route: "",
                    data: "",
                    receive: [],
                    isFirstSend: !0,
                    method: "requestResponse",
                    fakeMethod: "get"
                })), n(o)
            }, children: [t("div", {
                css: r`
            height: 44px;
            width: 242px;
            text-align: center;
            line-height: 44px;
            font-family: Poppins, serif;
            font-style: normal;
            font-weight: 600;
            color: #FFFFFF;
            cursor: pointer;
            background-color: #7297FC;
            border-radius: 3px;
          `, children: "+ Add Request"
            }), t("div", {
                css: r`
            margin-left: 10px;
            cursor: pointer;

            &:hover {
              transition: .3s all ease;
              transform: scale(1.2);
            }
          `, onClick: o => {
                    o.stopPropagation(), g.dispatch(ze())
                }, children: t("img", {src: mt})
            })]
        }), t(Re, {
            children: e.map((o, i) => t(Ce, {
                timeout: 1e3,
                classNames: "item",
                unmountOnExit: !0,
                children: t("div", {children: t(ut, {sideBarRef: c, path: a, info: o})}, o.id)
            }, o.id))
        })]
    })
}, {Footer: bt, Sider: yt, Content: ft} = J;

function gt() {
    S.exports.useState(0), q();
    const e = O(a => a.requestSliceReducer);
    return d("div", {
        css: r`height: 100%;`, children: [t(at, {}), d(J, {
            css: r`height: 100%;`, children: [t(st, {}), d(J, {
                css: r`background-color: #1c1d22`, children: [t(ht, {requestItems: e}), t(ft, {
                    css: r`
            margin: 30px 32px;
            border-left: 0;
            border-right: 0;
            background-color: #1c1d22;
            border-radius: 3px;
            overflow: auto`, children: t(Me, {children: t(Be, {path: "/:requestID", element: t(pt, {})})})
                })]
            })]
        })]
    })
}

k.config({duration: 2, maxCount: 3, rtl: !0}), Ne.render(N(qe, {
    store: g,
    children: N(Oe, {loading: null, persistor: Ke, children: N(Pe, {children: N(gt, {})})})
}), document.getElementById("root"));
