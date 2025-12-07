package com.canicolectivo.caniweb.model;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

class UserTest {
    /*
    @Test
    void testAddAndRemoveRoleKeepsBidirectionalRelation() {
        User user = new User("user@example.com", "password123");
        Role role = new Role("ADMIN");

        // Initially no relations
        assertTrue(user.getRoles().isEmpty(), "New user should have no roles");
        assertTrue(role.getUsers().isEmpty(), "New role should have no users");

        // Add role to user and verify both sides updated
        user.addRole(role);
        assertTrue(user.getRoles().contains(role), "User must contain the added role");
        assertTrue(role.getUsers().contains(user), "Role must contain the user after addRole");

        // Remove role and verify both sides updated
        user.removeRole(role);
        assertFalse(user.getRoles().contains(role), "User must not contain the role after removal");
        assertFalse(role.getUsers().contains(user), "Role must not contain the user after removal");
    }

    @Test
    void testEmailAndPasswordAccessors() {
        User user = new User("user@example.com", "password123");
        user.setEmail("alice@example.com");
        user.setPassword("s3cr3t");

        assertEquals("alice@example.com", user.getEmail(), "Email getter should return the value set");
        assertEquals("s3cr3t", user.getPassword(), "Password getter should return the value set");
    }

    @Test
    void testArtistAssociationGettersAndSetters() {
        User user = new User("artistuser@example.com", "pwd");
        Artist artist = new Artist(); 

        // Associate artist from the user's side
        user.setArtist(artist);
        assertSame(artist, user.getArtist(), "getArtist should return the object set via setArtist");

        // Associate user from the artist's side and verify
        artist.setUser(user);
        assertSame(user, artist.getUser(), "Artist.getUser must return the user set via Artist.setUser");
    }

     */
}