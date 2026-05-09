"use client";

import { ArrowRight, Laptop, Smartphone, Headphones, Gamepad2, Blocks } from "lucide-react";
import Link from "next/link";

const ICON_COLORS = ['#8B5CF6','#06B6D4','#A78BFA','#67E8F9'];
const ICON_MAP = { Laptop, Smartphone, Headphones, Gamepad2, Blocks };

export default function CategoryGrid({ categories }) {
    return (
        <>
            {/* Header */}
            <div style={{display:'flex',flexWrap:'wrap',alignItems:'flex-end',justifyContent:'space-between',gap:'16px',marginBottom:'32px'}}>
                <div>
                    <h2 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:'1.875rem',fontWeight:700,color:'#F1F5F9',letterSpacing:'-0.03em',marginBottom:'6px',margin:'0 0 6px'}}>
                        Shop by Category
                    </h2>
                    <p style={{color:'#64748B',fontSize:'0.9375rem',margin:0}}>Discover the best in modern tech.</p>
                </div>
                <Link href="/Home/category" style={{display:'flex',alignItems:'center',gap:'6px',color:'#8B5CF6',fontWeight:600,fontSize:'14px',textDecoration:'none'}}>
                    View All <ArrowRight size={16} />
                </Link>
            </div>

            {/* Grid */}
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:'20px'}}>
                {categories.map((category, idx) => {
                    const Icon = ICON_MAP[category.iconName] || Blocks;
                    const color = ICON_COLORS[idx % ICON_COLORS.length];
                    return (
                        <Link key={category.id} href={category.href}
                            style={{
                                display:'flex',flexDirection:'column',alignItems:'flex-start',
                                background:'linear-gradient(135deg,rgba(139,92,246,0.07),rgba(6,182,212,0.03))',
                                border:'1px solid rgba(139,92,246,0.15)',borderRadius:'20px',
                                padding:'24px',transition:'all 0.3s cubic-bezier(0.4,0,0.2,1)',
                                textDecoration:'none',cursor:'pointer'
                            }}
                            onMouseEnter={e=>{
                                e.currentTarget.style.borderColor='rgba(139,92,246,0.45)';
                                e.currentTarget.style.transform='translateY(-4px)';
                                e.currentTarget.style.boxShadow='0 0 0 1px rgba(139,92,246,0.2),0 24px 60px rgba(0,0,0,0.6),0 0 30px rgba(139,92,246,0.12)';
                            }}
                            onMouseLeave={e=>{
                                e.currentTarget.style.borderColor='rgba(139,92,246,0.15)';
                                e.currentTarget.style.transform='translateY(0)';
                                e.currentTarget.style.boxShadow='none';
                            }}
                        >
                            <div style={{
                                width:'52px',height:'52px',borderRadius:'14px',
                                background:`linear-gradient(135deg,${color}22,${color}11)`,
                                border:`1px solid ${color}33`,
                                display:'flex',alignItems:'center',justifyContent:'center',
                                marginBottom:'56px',color,
                                boxShadow:`0 0 16px ${color}22`
                            }}>
                                <Icon size={22} />
                            </div>
                            <h3 style={{color:'#F1F5F9',fontSize:'1.0625rem',fontWeight:700,marginBottom:'4px',fontFamily:"'Space Grotesk',sans-serif",margin:'0 0 4px'}}>
                                {category.title}
                            </h3>
                            <p style={{color:'#64748B',fontSize:'0.875rem',margin:0}}>{category.description}</p>
                        </Link>
                    );
                })}
            </div>
        </>
    );
}
