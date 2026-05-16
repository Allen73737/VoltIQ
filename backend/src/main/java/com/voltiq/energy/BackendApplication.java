package com.voltiq.energy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.net.URI;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
@EnableScheduling
@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		applyRenderDatabaseProperties();
		SpringApplication.run(BackendApplication.class, args);
	}

	private static void applyRenderDatabaseProperties() {
		String databaseUrl = System.getenv("DATABASE_URL");
		if (databaseUrl == null || !databaseUrl.startsWith("postgresql://")) {
			return;
		}

		URI uri = URI.create(databaseUrl);
		String[] userInfo = uri.getUserInfo().split(":", 2);
		String jdbcUrl = "jdbc:postgresql://" + uri.getHost() + ":" + uri.getPort() + uri.getPath();
		if (uri.getQuery() != null && !uri.getQuery().isBlank()) {
			jdbcUrl += "?" + uri.getQuery();
		}
		System.setProperty("spring.datasource.url", jdbcUrl);
		System.setProperty("spring.datasource.username", decode(userInfo[0]));
		System.setProperty("spring.datasource.password", userInfo.length > 1 ? decode(userInfo[1]) : "");
	}

	private static String decode(String value) {
		return URLDecoder.decode(value, StandardCharsets.UTF_8);
	}
}
