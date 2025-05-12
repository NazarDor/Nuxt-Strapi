<template>
  <nav class="layout-sidebar shadow-white shadow-md">
    <ul class="layout-menu">
      <li
        v-for="(item, index) in menu"
        :key="index"
        class="layout-root-menuitem"
      >
        <div
          class="layout-menuitem-root-text cursor-pointer select-none"
          @click="toggleRootMenu(index)"
        >
          {{ item.label }}
        </div>
        <a
          v-if="item.link && !item.children"
          :href="item.link"
          class="layout-menuitem-link"
          :class="{ 'router-link-active': isActiveLink(item.link) }"
        >
          <i :class="['pi', item.icon, 'layout-menuitem-icon']"></i>
          <span class="layout-menuitem-text">{{ item.label }}</span>
        </a>
        <a
          v-else
          href="javascript:void(0)"
          class="layout-menuitem-link flex justify-between items-center"
          @click.prevent="toggleSubmenu(index)"
          :aria-expanded="openMenus.includes(index)"
          tabindex="0"
        >
          <div class="flex items-center">
            <i :class="['pi', item.icon, 'layout-menuitem-icon']"></i>
            <span class="layout-menuitem-text">{{ item.label }}</span>
          </div>
          <i
            class="pi pi-fw pi-angle-down layout-submenu-toggler transition-transform duration-300"
            :class="{ 'rotate-180': openMenus.includes(index) }"
          ></i>
        </a>
        <ul
          v-if="item.children"
          class="layout-submenu overflow-hidden transition-all duration-300"
          :style="submenuStyle(index)"
        >
          <li
            v-for="(child, cIndex) in item.children"
            :key="cIndex"
            class="layout-submenu-item"
          >
            <a
              :href="child.link"
              class="layout-menuitem-link"
              :class="{ 'router-link-active': isActiveLink(child.link) }"
            >
              <i :class="['pi', child.icon, 'layout-menuitem-icon']"></i>
              <span class="layout-menuitem-text">{{ child.label }}</span>
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { ref, computed, nextTick } from "vue";

const menu = [
  {
    label: "Home",
    icon: "pi-home",
    link: "/",
  },
  {
    label: "Pages",
    icon: "pi-briefcase",
    children: [
      { label: "Prodycts", icon: "pi-shopping-bag", link: "/products" },
      { label: "Services", icon: "pi-file-check", link: "/services" },
      {
        label: "About",
        icon: "pi-info-circle",
        link: "/about",
      },
    ],
  },
];

const openMenus = ref([]);

function toggleSubmenu(index) {
  const pos = openMenus.value.indexOf(index);
  if (pos === -1) {
    openMenus.value.push(index);
  } else {
    openMenus.value.splice(pos, 1);
  }
}

function toggleRootMenu(index) {
  toggleSubmenu(index);
}

function isActiveLink(link) {
  return window.location.pathname === link;
}

function submenuStyle(index) {
  if (!openMenus.value.includes(index)) {
    return { height: "0", paddingTop: "0", paddingBottom: "0" };
  }
  return { height: "auto", paddingTop: "0.5rem", paddingBottom: "0.5rem" };
}
</script>
  
  <style scoped>
.layout-sidebar {
  position: fixed;
  width: 20rem;
  height: calc(100vh - 6rem);
  top: 6rem;
  left: 2rem;
  border-radius: var(--content-border-radius, 0.5rem);
  padding: 1rem 1.5rem;
  overflow-y: auto;
  user-select: none;
  z-index: 999;
}

.layout-menu {
  margin: 0;
  padding: 0;
  list-style: none;
}

.layout-menuitem-root-text {
  font-size: 0.75rem;
  text-transform: uppercase;
  font-weight: 700;
  margin: 0.75rem 0;
  cursor: pointer;
  user-select: none;
}

.layout-menuitem-link {
  display: flex;
  align-items: center;
  padding: 0.5rem 0.75rem;
  text-decoration: none;
  border-radius: 0.375rem;
  user-select: none;
  transition: background-color 0.2s ease;
}

.layout-menuitem-link:hover,
.layout-menuitem-link.router-link-active {
  background-color: var(--primary-color, #3b82f6);
}

.layout-menuitem-icon {
  margin-right: 0.5rem;
  font-size: 1.125rem;
  flex-shrink: 0;
}

.layout-submenu {
  list-style: none;
  padding-left: 1.5rem;
  margin: 0;
  overflow: hidden;
  transition: height 0.3s ease, padding 0.3s ease;
}

.layout-submenu-toggler {
  transition: transform 0.3s ease;
}

.rotate-180 {
  transform: rotate(180deg);
}
</style>
  