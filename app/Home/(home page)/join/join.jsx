"use client";

export default function Join() {
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
            <div style={{
                position:'relative',overflow:'hidden',borderRadius:'28px',
                background:'linear-gradient(135deg,rgba(139,92,246,0.12) 0%,rgba(99,102,241,0.08) 50%,rgba(6,182,212,0.1) 100%)',
                border:'1px solid rgba(139,92,246,0.25)',
                padding:'64px 48px',
                boxShadow:'0 0 0 1px rgba(139,92,246,0.1), 0 40px 80px rgba(0,0,0,0.5), 0 0 60px rgba(139,92,246,0.08)'
            }}>
                {/* Decorative orbs */}
                <div style={{position:'absolute',top:'-80px',right:'-80px',width:'320px',height:'320px',borderRadius:'50%',background:'radial-gradient(circle,rgba(139,92,246,0.2),transparent 70%)',pointerEvents:'none'}} />
                <div style={{position:'absolute',bottom:'-60px',left:'30%',width:'240px',height:'240px',borderRadius:'50%',background:'radial-gradient(circle,rgba(6,182,212,0.15),transparent 70%)',pointerEvents:'none'}} />
                {/* Grid */}
                <div style={{position:'absolute',inset:0,opacity:0.04,backgroundImage:'linear-gradient(rgba(139,92,246,1) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,1) 1px,transparent 1px)',backgroundSize:'50px 50px',pointerEvents:'none'}} />

                <div style={{position:'relative',zIndex:1,maxWidth:'600px'}}>
                    <div style={{display:'inline-flex',alignItems:'center',gap:'8px',marginBottom:'20px',
                        background:'linear-gradient(135deg,rgba(139,92,246,0.2),rgba(6,182,212,0.1))',
                        border:'1px solid rgba(139,92,246,0.4)',borderRadius:'999px',padding:'6px 14px',
                        boxShadow:'0 0 16px rgba(139,92,246,0.25)'}}>
                        <span style={{color:'#A78BFA',fontSize:'11px',fontWeight:700,letterSpacing:'0.08em',fontFamily:"'Space Grotesk',sans-serif"}}>✦ EXCLUSIVE OFFER</span>
                    </div>

                    <h2 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:'clamp(1.75rem,4vw,2.5rem)',fontWeight:800,color:'#F1F5F9',letterSpacing:'-0.04em',marginBottom:'16px',lineHeight:1.1}}>
                        Join the <span style={{background:'linear-gradient(135deg,#8B5CF6,#06B6D4)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>Tech Revolution</span>
                    </h2>

                    <p style={{color:'#94A3B8',fontSize:'1.0625rem',lineHeight:1.7,marginBottom:'32px',maxWidth:'480px'}}>
                        Subscribe and get <span style={{color:'#A78BFA',fontWeight:700}}>15% off</span> your first order. Stay ahead with the latest gadget releases.
                    </p>

                    <div style={{display:'flex',flexWrap:'wrap',gap:'12px',marginBottom:'16px',maxWidth:'500px'}}>
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            style={{
                                flex:'1 1 200px',height:'52px',padding:'0 20px',borderRadius:'14px',
                                background:'rgba(255,255,255,0.05)',border:'1px solid rgba(139,92,246,0.25)',
                                color:'#E2E8F0',fontSize:'14px',outline:'none',
                                fontFamily:"'Inter',sans-serif",minWidth:'0'
                            }}
                            onFocus={e=>{e.target.style.borderColor='rgba(139,92,246,0.6)';e.target.style.boxShadow='0 0 0 3px rgba(139,92,246,0.12)'}}
                            onBlur={e=>{e.target.style.borderColor='rgba(139,92,246,0.25)';e.target.style.boxShadow='none'}}
                        />
                        <button style={{
                            height:'52px',padding:'0 28px',borderRadius:'14px',fontWeight:700,
                            background:'linear-gradient(135deg,#8B5CF6,#6366F1)',color:'white',
                            border:'none',cursor:'pointer',fontSize:'15px',
                            boxShadow:'0 4px 20px rgba(139,92,246,0.5)',
                            fontFamily:"'Space Grotesk',sans-serif",whiteSpace:'nowrap',
                            transition:'all 0.25s ease'
                        }}
                            onMouseEnter={e=>{e.currentTarget.style.boxShadow='0 8px 36px rgba(139,92,246,0.75)';e.currentTarget.style.transform='translateY(-1px)'}}
                            onMouseLeave={e=>{e.currentTarget.style.boxShadow='0 4px 20px rgba(139,92,246,0.5)';e.currentTarget.style.transform='translateY(0)'}}
                        >
                            Subscribe Now
                        </button>
                    </div>
                    <p style={{color:'#475569',fontSize:'13px'}}>No spam. Unsubscribe anytime.</p>
                </div>
            </div>
        </section>
    );
}