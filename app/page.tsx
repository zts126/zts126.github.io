"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";
import Link from "next/link";

type SectionId = "web" | "mobile" | "car" | "profile";

type PortfolioSection = {
  id: SectionId;
  label: string;
  icon: string;
  activeIcon: string;
  description: string;
  button: string;
};

const sections: PortfolioSection[] = [
  {
    id: "web",
    label: "网页端",
    icon: "/assets/web-folder-closed.png",
    activeIcon: "/assets/web-folder-open.png",
    description:
      "围绕模型全生命周期业务流程梳理复杂业务路径并完成高保真落地；聚焦双十一活动，通过优化活动页面结构，帮助提升购买效率与转化表现。",
    button: "查看作品",
  },
  {
    id: "mobile",
    label: "移动端",
    icon: "/assets/mobile-folder-closed.png",
    activeIcon: "/assets/mobile-folder-open.png",
    description:
      "将医生入驻与管理流程的复杂业务规则，转化为清晰、可执行的医生入驻体验，并形成可复用的医疗数据沉淀，同时让患者获得清晰的咨询结果。",
    button: "查看作品",
  },
  {
    id: "car",
    label: "车机端",
    icon: "/assets/car-folder-closed.png",
    activeIcon: "/assets/car-folder-open.png",
    description:
      "极氪 DC1E 欧版蓝牙短信功能覆盖消息接收、查看、发送、来电短信拒接及模板管理等流程，并完成黑夜与白天模式适配。",
    button: "查看作品",
  },
  {
    id: "profile",
    label: "个人简介",
    icon: "/assets/portrait.webp",
    activeIcon: "/assets/portrait.webp",
    description:
      "我叫张天粟，很荣幸您能看到我的简历。听闻贵公司现处招聘期，本人非常愿意参加贵公司面试，请查看我的个人信息～",
    button: "了解我",
  },
];

export default function Home() {
  const [hovered, setHovered] = useState<SectionId | null>(null);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    const resetWithEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setHovered(null);
        setContactOpen(false);
      }
    };

    window.addEventListener("keydown", resetWithEscape);
    return () => window.removeEventListener("keydown", resetWithEscape);
  }, []);

  const toggleOnTouch = (id: SectionId) => {
    if (window.matchMedia("(hover: none)").matches) {
      setHovered((current) => (current === id ? null : id));
    }
  };

  return (
    <main
      className={`portfolio-stage ${hovered ? "has-hover" : ""}${contactOpen ? " contact-is-open" : ""}`}
      data-hovered={hovered ?? "none"}
      onMouseLeave={() => {
        setHovered(null);
        setContactOpen(false);
      }}
    >
      <h1 className="welcome-title">
        <span>欢迎来到我的</span>
        <span>个人空间 :)</span>
      </h1>

      <section className="showcase" aria-label="作品分类">
        {sections.map((section) => {
          const isActive = hovered === section.id;
          const isInactive = hovered !== null && !isActive;

          return (
            <article
              key={section.id}
              className={`portfolio-item item-${section.id}${isActive ? " is-active" : ""}${isInactive ? " is-inactive" : ""}`}
              tabIndex={0}
              aria-label={`${section.label}，悬浮或聚焦展开`}
              onMouseEnter={() => {
                setContactOpen(false);
                setHovered(section.id);
              }}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => {
                setContactOpen(false);
                setHovered(section.id);
              }}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) setHovered(null);
              }}
              onClick={() => toggleOnTouch(section.id)}
            >
              <ExpandedVisual id={section.id} />

              <div className="item-identity">
                <span className="item-icon-wrap" aria-hidden="true">
                  <img className="item-icon icon-closed" src={section.icon} alt="" />
                  <img className="item-icon icon-open" src={section.activeIcon} alt="" />
                </span>
                <span className="item-label">{section.label}</span>
                <h2 className="active-title">{section.label}</h2>
              </div>

              <div className={`active-copy${section.id === "profile" ? " handwritten-copy" : ""}`}>
                <p>{section.description}</p>
                <Link
                  href={`/view/${section.id}`}
                  className="detail-button"
                  onClick={(event) => event.stopPropagation()}
                >
                  {section.button}
                </Link>
              </div>
            </article>
          );
        })}
      </section>

      <p className="home-intro">
        本人具备较完整的 UX/UI 设计能力，拥有 B 端、C 端及车载 HMI 项目经验，能够从需求理解、业务梳理到交互与视觉方案落地完整推进。注重复杂信息梳理、体验一致性与设计落地，也持续将 AI 工具融入设计流程，提升分析与交付效率。拥有六年设计相关经历，具备较高审美能力，对工作认真负责。
      </p>

      <button
        type="button"
        className={`contact-dock${contactOpen ? " is-open" : ""}`}
        aria-label={contactOpen ? "收起联系方式" : "展开联系方式"}
        aria-expanded={contactOpen}
        onMouseEnter={() => {
          setHovered(null);
          setContactOpen(true);
        }}
        onMouseLeave={() => setContactOpen(false)}
        onFocus={() => {
          setHovered(null);
          setContactOpen(true);
        }}
        onBlur={() => setContactOpen(false)}
        onClick={() => {
          if (window.matchMedia("(hover: none)").matches) {
            setHovered(null);
            setContactOpen((current) => !current);
          }
        }}
      >
        <span className="contact-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="contact-content" aria-hidden="true">
          <img src="/assets/contact-qr.webp" alt="" />
        </span>
      </button>
    </main>
  );
}

function ExpandedVisual({ id }: { id: SectionId }) {
  if (id === "web") {
    return (
      <div className="expanded-visual web-visual" aria-hidden="true">
        <img className="web-showcase-image" src="/assets/web-showcase.png" alt="" />
        <div className="web-icon-cloud">
          {[1, 2, 3, 4, 5].map((number) => (
            <img key={number} src={`/assets/web-icon-${number}.webp`} alt="" />
          ))}
        </div>
      </div>
    );
  }

  if (id === "mobile") {
    return (
      <div className="expanded-visual mobile-visual" aria-hidden="true">
        <img className="mobile-showcase-image" src="/assets/mobile-showcase-v2.png" alt="" />
        <span className="mobile-logo mobile-logo-kuaishou">
          <img src="/assets/mobile-kuaishou.webp" alt="" />
        </span>
        <span className="mobile-logo mobile-logo-medical">
          <img src="/assets/mobile-medical.webp" alt="" />
        </span>
      </div>
    );
  }

  if (id === "car") {
    return (
      <div className="expanded-visual car-visual" aria-hidden="true">
        <div className="car-screen car-screen-day">
          <img src="/assets/car-day-v2.png" alt="" />
        </div>
        <div className="car-screen car-screen-night">
          <img src="/assets/car-night-v2.png" alt="" />
        </div>
        <img className="car-model" src="/assets/car-model.webp" alt="" />
      </div>
    );
  }

  return (
    <div className="expanded-visual profile-visual" aria-hidden="true">
      <img className="profile-person" src="/assets/profile-person-v2.png" alt="" />
      <img className="profile-sticker profile-sticker-best" src="/assets/sticker-best.webp" alt="" />
      <img className="profile-sticker profile-sticker-friendly" src="/assets/sticker-friendly.webp" alt="" />
      <img className="profile-sticker profile-sticker-creator" src="/assets/sticker-creator.webp" alt="" />
    </div>
  );
}
