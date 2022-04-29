window.BENCHMARK_DATA = {
  "lastUpdate": 1651262678218,
  "repoUrl": "https://github.com/unicode-org/icu",
  "entries": {
    "Benchmark": [
      {
        "commit": {
          "author": {
            "email": "nrunge@google.com",
            "name": "gnrunge",
            "username": "gnrunge"
          },
          "committer": {
            "email": "41129501+gnrunge@users.noreply.github.com",
            "name": "Norbert Runge",
            "username": "gnrunge"
          },
          "distinct": true,
          "id": "80ee559205dd165c2d647610376d6f9a06822ae4",
          "message": "ICU-21843 Add ICU4C performance tests to continuous integration\n\nSee #1987",
          "timestamp": "2022-03-07T12:53:44-08:00",
          "tree_id": "7da686bd1662079612215dc8b0f27437626720c3",
          "url": "https://github.com/unicode-org/icu/commit/80ee559205dd165c2d647610376d6f9a06822ae4"
        },
        "date": 1646687303485,
        "tool": "ndjson",
        "benches": [
          {
            "name": "titlecase_letter_add",
            "value": 57753.3272,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_contains",
            "value": 115436.0109,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_iterator",
            "value": 0.4404,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_add",
            "value": 7.2914,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_contains",
            "value": 4.3124,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_iterator",
            "value": 0,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern1",
            "value": 11716.2784,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern2",
            "value": 40376.3128,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern3",
            "value": 1997.3709,
            "unit": "ns/iter",
            "biggerIsBetter": false
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "avetlov@riverlogic.com",
            "name": "Alexey Vetlov",
            "username": "avetlov"
          },
          "committer": {
            "email": "markus.icu@gmail.com",
            "name": "Markus Scherer",
            "username": "markusicu"
          },
          "distinct": true,
          "id": "1393face12f7205a133a63f13bb592f561b4abfb",
          "message": "ICU-21768 Fixed (u_snprintf improperly counts the required buffer size). Modified TestSnprintf to test the null buffer case.",
          "timestamp": "2022-03-08T23:09:54Z",
          "tree_id": "586d92fe70bb8985ec51cb46c5c3b4f26dadd05c",
          "url": "https://github.com/unicode-org/icu/commit/1393face12f7205a133a63f13bb592f561b4abfb"
        },
        "date": 1646781858189,
        "tool": "ndjson",
        "benches": [
          {
            "name": "titlecase_letter_add",
            "value": 71486.9938,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_contains",
            "value": 119536.4062,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_iterator",
            "value": 0.4968,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_add",
            "value": 8.156,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_contains",
            "value": 4.4388,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_iterator",
            "value": 0,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern1",
            "value": 12044.2993,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern2",
            "value": 41738.1805,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern3",
            "value": 2108.3561,
            "unit": "ns/iter",
            "biggerIsBetter": false
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "shane@unicode.org",
            "name": "Shane F. Carr",
            "username": "sffc"
          },
          "committer": {
            "email": "shane@unicode.org",
            "name": "Shane F. Carr",
            "username": "sffc"
          },
          "distinct": true,
          "id": "31871cc14f5b55a53511884d9787494905a80a00",
          "message": "ICU-21801 Fix array comparison warning in uspoof_impl.cpp\n\nSee #2015",
          "timestamp": "2022-03-08T15:21:53-08:00",
          "tree_id": "bd6da903ad6a15330b5714ac76b55b1000680a13",
          "url": "https://github.com/unicode-org/icu/commit/31871cc14f5b55a53511884d9787494905a80a00"
        },
        "date": 1646782507659,
        "tool": "ndjson",
        "benches": [
          {
            "name": "titlecase_letter_add",
            "value": 82806.8562,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_contains",
            "value": 137160.6815,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_iterator",
            "value": 0.5721,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_add",
            "value": 9.6963,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_contains",
            "value": 5.1612,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_iterator",
            "value": 0,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern1",
            "value": 14283.5767,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern2",
            "value": 49539.7767,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern3",
            "value": 2473.6473,
            "unit": "ns/iter",
            "biggerIsBetter": false
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "shane@unicode.org",
            "name": "Shane F. Carr",
            "username": "sffc"
          },
          "committer": {
            "email": "42151464+pedberg-icu@users.noreply.github.com",
            "name": "Peter Edberg",
            "username": "pedberg-icu"
          },
          "distinct": true,
          "id": "f57ef9ebf72d889e9b93be90fbc020fae0e374ae",
          "message": "ICU-21527 Assert pattern equality instead of object equality",
          "timestamp": "2022-03-08T15:31:52-08:00",
          "tree_id": "ecf2895c54243a8853b544b889a8c7677e6381b5",
          "url": "https://github.com/unicode-org/icu/commit/f57ef9ebf72d889e9b93be90fbc020fae0e374ae"
        },
        "date": 1646783182556,
        "tool": "ndjson",
        "benches": [
          {
            "name": "titlecase_letter_add",
            "value": 58438.2949,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_contains",
            "value": 102889.2616,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_iterator",
            "value": 0.4586,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_add",
            "value": 7.1506,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_contains",
            "value": 4.0811,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_iterator",
            "value": 0,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern1",
            "value": 11519.5039,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern2",
            "value": 43152.7895,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern3",
            "value": 2303.3569,
            "unit": "ns/iter",
            "biggerIsBetter": false
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "elango@unicode.org",
            "name": "Elango Cheran",
            "username": "echeran"
          },
          "committer": {
            "email": "elango@unicode.org",
            "name": "Elango",
            "username": "echeran"
          },
          "distinct": true,
          "id": "f79f03dad5ffcd0e7ac9e1bcbd05fc38bff8e3a2",
          "message": "ICU-21322 Add parse and format methods for DecimalQuantity with exponent\n\nSee #2012",
          "timestamp": "2022-03-08T15:56:50-08:00",
          "tree_id": "e99f29d061b511c3a728814891002ca64d0008cd",
          "url": "https://github.com/unicode-org/icu/commit/f79f03dad5ffcd0e7ac9e1bcbd05fc38bff8e3a2"
        },
        "date": 1646784584989,
        "tool": "ndjson",
        "benches": [
          {
            "name": "titlecase_letter_add",
            "value": 60740.2048,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_contains",
            "value": 108671.6256,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_iterator",
            "value": 0.4658,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_add",
            "value": 7.3082,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_contains",
            "value": 4.0594,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_iterator",
            "value": 0,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern1",
            "value": 12148.0555,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern2",
            "value": 40672.6704,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern3",
            "value": 2128.1877,
            "unit": "ns/iter",
            "biggerIsBetter": false
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "daniel.bevenius@gmail.com",
            "name": "Daniel Bevenius",
            "username": "danbev"
          },
          "committer": {
            "email": "markus.icu@gmail.com",
            "name": "Markus Scherer",
            "username": "markusicu"
          },
          "distinct": true,
          "id": "55a51fa9bde41598fb70c5931d313e908f21ca65",
          "message": "ICU-21784 suppress -Wunused-function warning in unistr.cpp\n\nThis commit adds an ignore of the unused function\nuprv_UnicodeStringDummy.",
          "timestamp": "2022-03-09T03:31:37Z",
          "tree_id": "6f7b710d4a93a3e7597bccfba1321df26f0084ee",
          "url": "https://github.com/unicode-org/icu/commit/55a51fa9bde41598fb70c5931d313e908f21ca65"
        },
        "date": 1646797523219,
        "tool": "ndjson",
        "benches": [
          {
            "name": "titlecase_letter_add",
            "value": 60695.8278,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_contains",
            "value": 108594.9259,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_iterator",
            "value": 0.4052,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_add",
            "value": 7.201,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_contains",
            "value": 4.0568,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_iterator",
            "value": 0,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern1",
            "value": 12145.9521,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern2",
            "value": 40647.1669,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern3",
            "value": 2127.3278,
            "unit": "ns/iter",
            "biggerIsBetter": false
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "alexandermv@gmail.com",
            "name": "Alexander Morozov",
            "username": "alxrmorozov"
          },
          "committer": {
            "email": "markus.icu@gmail.com",
            "name": "Markus Scherer",
            "username": "markusicu"
          },
          "distinct": true,
          "id": "234cbe2c17034c68d6dd6df09fda79a052f0a238",
          "message": "ICU-21805 Remove useless check",
          "timestamp": "2022-03-09T03:37:37Z",
          "tree_id": "9e1ab2725eb42216e690fc018fce2b085fddb70f",
          "url": "https://github.com/unicode-org/icu/commit/234cbe2c17034c68d6dd6df09fda79a052f0a238"
        },
        "date": 1646798056062,
        "tool": "ndjson",
        "benches": [
          {
            "name": "titlecase_letter_add",
            "value": 53541.1919,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_contains",
            "value": 95853.0754,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_iterator",
            "value": 0.4108,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_add",
            "value": 6.4439,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_contains",
            "value": 4.0582,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_iterator",
            "value": 0,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern1",
            "value": 10728.5826,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern2",
            "value": 35901.0666,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern3",
            "value": 1878.9982,
            "unit": "ns/iter",
            "biggerIsBetter": false
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "nrunge@google.com",
            "name": "gnrunge",
            "username": "gnrunge"
          },
          "committer": {
            "email": "41129501+gnrunge@users.noreply.github.com",
            "name": "Norbert Runge",
            "username": "gnrunge"
          },
          "distinct": true,
          "id": "77e0c9e371994b739e4049ab4dc476ab8b8c5719",
          "message": "ICU-21900 Adjusts performance alert threshold to 150%, i.e. the alert only is\ntriggered if the current measured execution time is 50% higher than the previous\ntime.\nThe current setting of 100% means that even a 1% increase from previous time\ntriggers the alert already.",
          "timestamp": "2022-03-09T11:10:43-08:00",
          "tree_id": "430a4aa2ed3e70bf913386f73e673d6391f87c4b",
          "url": "https://github.com/unicode-org/icu/commit/77e0c9e371994b739e4049ab4dc476ab8b8c5719"
        },
        "date": 1646853821411,
        "tool": "ndjson",
        "benches": [
          {
            "name": "titlecase_letter_add",
            "value": 58779.1854,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_contains",
            "value": 108603.7883,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_iterator",
            "value": 0.4659,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_add",
            "value": 7.3184,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_contains",
            "value": 4.057,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_iterator",
            "value": 0,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern1",
            "value": 12145.3091,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern2",
            "value": 40685.0559,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern3",
            "value": 2126.3341,
            "unit": "ns/iter",
            "biggerIsBetter": false
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "younies.mahmoud@gmail.com",
            "name": "Younies",
            "username": "younies"
          },
          "committer": {
            "email": "younies@chromium.org",
            "name": "Younies Mahmoud",
            "username": "younies"
          },
          "distinct": true,
          "id": "bb822ba38a8b8e0ebd33d8311579043bd7978794",
          "message": "ICU-21936 Make the internal units converters public\n\nSee #2021",
          "timestamp": "2022-03-09T22:42:04+01:00",
          "tree_id": "1e1a52e65f91a8ea8454578ce854063b1be82290",
          "url": "https://github.com/unicode-org/icu/commit/bb822ba38a8b8e0ebd33d8311579043bd7978794"
        },
        "date": 1646862960505,
        "tool": "ndjson",
        "benches": [
          {
            "name": "titlecase_letter_add",
            "value": 81315.7386,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_contains",
            "value": 135772.5027,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_iterator",
            "value": 0.5693,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_add",
            "value": 9.5064,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_contains",
            "value": 5.1101,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_iterator",
            "value": 0,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern1",
            "value": 14162.6683,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern2",
            "value": 49330.9347,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern3",
            "value": 2442.2194,
            "unit": "ns/iter",
            "biggerIsBetter": false
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "pedberg@unicode.org",
            "name": "Peter Edberg",
            "username": "pedberg-icu"
          },
          "committer": {
            "email": "42151464+pedberg-icu@users.noreply.github.com",
            "name": "Peter Edberg",
            "username": "pedberg-icu"
          },
          "distinct": true,
          "id": "571d12abfbe73a974fbe9d260b85975cbfd5f43c",
          "message": "ICU-21409 add word for bell to laodict",
          "timestamp": "2022-03-09T15:14:42-08:00",
          "tree_id": "360a095baf4597f47ff422696cb50d2e95e1e59d",
          "url": "https://github.com/unicode-org/icu/commit/571d12abfbe73a974fbe9d260b85975cbfd5f43c"
        },
        "date": 1646868553863,
        "tool": "ndjson",
        "benches": [
          {
            "name": "titlecase_letter_add",
            "value": 75008.7699,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_contains",
            "value": 125643.5667,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_iterator",
            "value": 0.5234,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_add",
            "value": 8.5519,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_contains",
            "value": 4.5725,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_iterator",
            "value": 0,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern1",
            "value": 12783.0657,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern2",
            "value": 42453.0676,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern3",
            "value": 2216.9744,
            "unit": "ns/iter",
            "biggerIsBetter": false
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "mspector@fastmail.com",
            "name": "Michael Spector",
            "username": "spektom"
          },
          "committer": {
            "email": "markus.icu@gmail.com",
            "name": "Markus Scherer",
            "username": "markusicu"
          },
          "distinct": true,
          "id": "e730bce02f15fecc290fe042cdf6f74cc9a78a4c",
          "message": "ICU-21815 Remove unused line",
          "timestamp": "2022-03-10T01:00:26Z",
          "tree_id": "d9fdd09810b4069b89b80efbb1e108c11f85f1bb",
          "url": "https://github.com/unicode-org/icu/commit/e730bce02f15fecc290fe042cdf6f74cc9a78a4c"
        },
        "date": 1646874816593,
        "tool": "ndjson",
        "benches": [
          {
            "name": "titlecase_letter_add",
            "value": 80011.335,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_contains",
            "value": 132042.2446,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_iterator",
            "value": 0.5263,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_add",
            "value": 8.8129,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_contains",
            "value": 4.9602,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_iterator",
            "value": 0,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern1",
            "value": 13498.8736,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern2",
            "value": 46287.5878,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern3",
            "value": 2367.0469,
            "unit": "ns/iter",
            "biggerIsBetter": false
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "shane@unicode.org",
            "name": "Shane Carr",
            "username": "sffc"
          },
          "committer": {
            "email": "shane@unicode.org",
            "name": "Shane F. Carr",
            "username": "sffc"
          },
          "distinct": true,
          "id": "8a5f045992eab8898eff5f6628650e75b8f13bc3",
          "message": "ICU-21900 Fix issue filtering in commit checker",
          "timestamp": "2022-03-09T19:20:02-08:00",
          "tree_id": "40c23771b9eb09cead8bd04f2a099e81767191cb",
          "url": "https://github.com/unicode-org/icu/commit/8a5f045992eab8898eff5f6628650e75b8f13bc3"
        },
        "date": 1646883156907,
        "tool": "ndjson",
        "benches": [
          {
            "name": "titlecase_letter_add",
            "value": 57749.1685,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_contains",
            "value": 115432.7108,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_iterator",
            "value": 0.4274,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_add",
            "value": 7.0643,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_contains",
            "value": 4.3122,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_iterator",
            "value": 0,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern1",
            "value": 11959.8408,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern2",
            "value": 41167.304,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern3",
            "value": 2032.3684,
            "unit": "ns/iter",
            "biggerIsBetter": false
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "pedberg@unicode.org",
            "name": "Peter Edberg",
            "username": "pedberg-icu"
          },
          "committer": {
            "email": "42151464+pedberg-icu@users.noreply.github.com",
            "name": "Peter Edberg",
            "username": "pedberg-icu"
          },
          "distinct": true,
          "id": "996378821c4ee89e68dc74183359e00f7130de0d",
          "message": "ICU-21839 Add ICU4J test that ISO8601 inherits patterns/symbols grom Gregorian",
          "timestamp": "2022-03-10T09:37:21-08:00",
          "tree_id": "0106e37264406db1343e6cef2ec0b5afbf40768c",
          "url": "https://github.com/unicode-org/icu/commit/996378821c4ee89e68dc74183359e00f7130de0d"
        },
        "date": 1646934658885,
        "tool": "ndjson",
        "benches": [
          {
            "name": "titlecase_letter_add",
            "value": 53458.4397,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_contains",
            "value": 95518.3096,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_iterator",
            "value": 0.3967,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_add",
            "value": 7.4127,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_contains",
            "value": 3.5681,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_iterator",
            "value": 0,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern1",
            "value": 11096.4697,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern2",
            "value": 36858.3434,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern3",
            "value": 1898.0053,
            "unit": "ns/iter",
            "biggerIsBetter": false
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "pedberg@unicode.org",
            "name": "Peter Edberg",
            "username": "pedberg-icu"
          },
          "committer": {
            "email": "42151464+pedberg-icu@users.noreply.github.com",
            "name": "Peter Edberg",
            "username": "pedberg-icu"
          },
          "distinct": true,
          "id": "f374427f6018056a6643c6519bbfadf869755ae0",
          "message": "ICU-21900 integrate CLDR release-41-beta1 to ICU main for 71rc",
          "timestamp": "2022-03-10T11:17:09-08:00",
          "tree_id": "52377cd9d7b956ff5192e4fa0fe3d53b630e9a63",
          "url": "https://github.com/unicode-org/icu/commit/f374427f6018056a6643c6519bbfadf869755ae0"
        },
        "date": 1646940690078,
        "tool": "ndjson",
        "benches": [
          {
            "name": "titlecase_letter_add",
            "value": 75953.5328,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_contains",
            "value": 126216.7128,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_iterator",
            "value": 0.4973,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_add",
            "value": 7.986,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_contains",
            "value": 4.7077,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_iterator",
            "value": 0,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern1",
            "value": 12853.7972,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern2",
            "value": 42716.167,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern3",
            "value": 2215.0423,
            "unit": "ns/iter",
            "biggerIsBetter": false
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "cwcornelius@gmail.com",
            "name": "Craig Cornelius",
            "username": "sven-oly"
          },
          "committer": {
            "email": "cwcornelius@gmail.com",
            "name": "Craig Cornelius",
            "username": "sven-oly"
          },
          "distinct": true,
          "id": "7fe330119e6b5503232cfd780869f5ff685ecdea",
          "message": "ICU-21900 ICU4C 71 change report\n\nSee #2024. Includes update to generator that removes the minor version indication from the reports.",
          "timestamp": "2022-03-10T15:50:45-08:00",
          "tree_id": "006f83812ce403ec53e3769323919eb155941a7e",
          "url": "https://github.com/unicode-org/icu/commit/7fe330119e6b5503232cfd780869f5ff685ecdea"
        },
        "date": 1646957030492,
        "tool": "ndjson",
        "benches": [
          {
            "name": "titlecase_letter_add",
            "value": 53876.394,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_contains",
            "value": 96110.7862,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_iterator",
            "value": 0.397,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_add",
            "value": 7.3707,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_contains",
            "value": 3.5886,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_iterator",
            "value": 0,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern1",
            "value": 11131.3426,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern2",
            "value": 37074.5412,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern3",
            "value": 1903.0681,
            "unit": "ns/iter",
            "biggerIsBetter": false
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "cwcornelius@gmail.com",
            "name": "Craig Cornelius",
            "username": "sven-oly"
          },
          "committer": {
            "email": "cwcornelius@gmail.com",
            "name": "Craig Cornelius",
            "username": "sven-oly"
          },
          "distinct": true,
          "id": "19c13048d24f0dc010d48249331913bf436fedb0",
          "message": "ICU-21900 Update ICU4J Change report (BRS#20)\n\nUpdate to show only major release numbers.",
          "timestamp": "2022-03-10T17:58:16-08:00",
          "tree_id": "eceff86f8dff9a267d5dfed594393cb554113fef",
          "url": "https://github.com/unicode-org/icu/commit/19c13048d24f0dc010d48249331913bf436fedb0"
        },
        "date": 1646964653929,
        "tool": "ndjson",
        "benches": [
          {
            "name": "titlecase_letter_add",
            "value": 60559.2151,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_contains",
            "value": 108589.8022,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_iterator",
            "value": 0.4518,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_add",
            "value": 8.3587,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_contains",
            "value": 4.0563,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_iterator",
            "value": 0,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern1",
            "value": 12597.9258,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern2",
            "value": 42069.4374,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern3",
            "value": 2156.6565,
            "unit": "ns/iter",
            "biggerIsBetter": false
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "pedberg@unicode.org",
            "name": "Peter Edberg",
            "username": "pedberg-icu"
          },
          "committer": {
            "email": "42151464+pedberg-icu@users.noreply.github.com",
            "name": "Peter Edberg",
            "username": "pedberg-icu"
          },
          "distinct": true,
          "id": "b5f10c4a1c19a0fe50bc4faa73062df4ed7d41fc",
          "message": "ICU-21332 Add tests from ICU4C TestDelimiters() into related ICU4J test",
          "timestamp": "2022-03-10T21:20:11-08:00",
          "tree_id": "3155b8800258c99573d9556c3e7be8ede960b1ba",
          "url": "https://github.com/unicode-org/icu/commit/b5f10c4a1c19a0fe50bc4faa73062df4ed7d41fc"
        },
        "date": 1646976782719,
        "tool": "ndjson",
        "benches": [
          {
            "name": "titlecase_letter_add",
            "value": 84313.8582,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_contains",
            "value": 139316.6034,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_iterator",
            "value": 0.5669,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_add",
            "value": 9.3885,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_contains",
            "value": 5.2455,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_iterator",
            "value": 0,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern1",
            "value": 14610.8504,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern2",
            "value": 49678.6641,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern3",
            "value": 2521.3017,
            "unit": "ns/iter",
            "biggerIsBetter": false
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "zhin@google.com",
            "name": "Ng Zhi An",
            "username": "ngzhian"
          },
          "committer": {
            "email": "markus.icu@gmail.com",
            "name": "Markus Scherer",
            "username": "markusicu"
          },
          "distinct": true,
          "id": "e0bb2ccdeb2d14000c2af63fc530b019f9361200",
          "message": "ICU-21844 Fix variable shadowing",
          "timestamp": "2022-03-11T19:10:53Z",
          "tree_id": "e2752ea8ab56cc092a5a06e9079d324bc5af7500",
          "url": "https://github.com/unicode-org/icu/commit/e0bb2ccdeb2d14000c2af63fc530b019f9361200"
        },
        "date": 1647026640499,
        "tool": "ndjson",
        "benches": [
          {
            "name": "titlecase_letter_add",
            "value": 83636.3704,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_contains",
            "value": 139998.1759,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_iterator",
            "value": 0.5598,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_add",
            "value": 8.9251,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_contains",
            "value": 5.1875,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_iterator",
            "value": 0,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern1",
            "value": 14215.1979,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern2",
            "value": 47322.0812,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern3",
            "value": 2499.4716,
            "unit": "ns/iter",
            "biggerIsBetter": false
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "pedberg@unicode.org",
            "name": "Peter Edberg",
            "username": "pedberg-icu"
          },
          "committer": {
            "email": "42151464+pedberg-icu@users.noreply.github.com",
            "name": "Peter Edberg",
            "username": "pedberg-icu"
          },
          "distinct": true,
          "id": "df6a8c877c76a120846323e7662016d534d0690f",
          "message": "ICU-13619 Now that UDATPG_NARROW is @stable, can reference it in header",
          "timestamp": "2022-03-11T13:06:50-08:00",
          "tree_id": "3b6dbaef199f1c19fb5e03bbf08bd8e40c6d29a6",
          "url": "https://github.com/unicode-org/icu/commit/df6a8c877c76a120846323e7662016d534d0690f"
        },
        "date": 1647033625844,
        "tool": "ndjson",
        "benches": [
          {
            "name": "titlecase_letter_add",
            "value": 72344.9959,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_contains",
            "value": 128443.1678,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_iterator",
            "value": 0.5314,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_add",
            "value": 9.8953,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_contains",
            "value": 4.8006,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_iterator",
            "value": 0,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern1",
            "value": 14897.0478,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern2",
            "value": 49999.2865,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern3",
            "value": 2509.9772,
            "unit": "ns/iter",
            "biggerIsBetter": false
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "markus.icu@gmail.com",
            "name": "Markus Scherer",
            "username": "markusicu"
          },
          "committer": {
            "email": "markus.icu@gmail.com",
            "name": "Markus Scherer",
            "username": "markusicu"
          },
          "distinct": true,
          "id": "29111fd19582bb995f6a3a8052d21e4fd756b3b4",
          "message": "ICU-21824 make the Unicode license match exactly\n\nThe ICU copy of the Unicode license was missing some lines that are\nconsidered part of the license text.\n\nSee https://github.com/unicode-org/template-repo/blob/main/LICENSE\nand https://www.unicode.org/license.txt",
          "timestamp": "2022-03-14T19:50:44Z",
          "tree_id": "fc1f892d2ef84e0169155887767528a32ca956a5",
          "url": "https://github.com/unicode-org/icu/commit/29111fd19582bb995f6a3a8052d21e4fd756b3b4"
        },
        "date": 1647288285534,
        "tool": "ndjson",
        "benches": [
          {
            "name": "titlecase_letter_add",
            "value": 68610.8865,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_contains",
            "value": 116791.6621,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_iterator",
            "value": 0.4833,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_add",
            "value": 7.7718,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_contains",
            "value": 4.3199,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_iterator",
            "value": 0,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern1",
            "value": 12230.6617,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern2",
            "value": 39571.2937,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern3",
            "value": 2057.2686,
            "unit": "ns/iter",
            "biggerIsBetter": false
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "markus.icu@gmail.com",
            "name": "Markus Scherer",
            "username": "markusicu"
          },
          "committer": {
            "email": "markus.icu@gmail.com",
            "name": "Markus Scherer",
            "username": "markusicu"
          },
          "distinct": true,
          "id": "bfca3ccaac707f5168f5888b2446a4518426bb04",
          "message": "ICU-21875 improve C API coverage",
          "timestamp": "2022-03-15T05:07:59Z",
          "tree_id": "8225a14dcf2fd2abc50cc44b8cbc4b0d4b5643be",
          "url": "https://github.com/unicode-org/icu/commit/bfca3ccaac707f5168f5888b2446a4518426bb04"
        },
        "date": 1647321688113,
        "tool": "ndjson",
        "benches": [
          {
            "name": "titlecase_letter_add",
            "value": 60573.8329,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_contains",
            "value": 108586.4225,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_iterator",
            "value": 0.4491,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_add",
            "value": 8.3289,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_contains",
            "value": 4.0564,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_iterator",
            "value": 0,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern1",
            "value": 12631.9945,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern2",
            "value": 41910.3238,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern3",
            "value": 2153.6835,
            "unit": "ns/iter",
            "biggerIsBetter": false
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "yumaoka@users.noreply.github.com",
            "name": "Yoshito Umaoka",
            "username": "yumaoka"
          },
          "committer": {
            "email": "yumaoka@users.noreply.github.com",
            "name": "Yoshito Umaoka",
            "username": "yumaoka"
          },
          "distinct": true,
          "id": "811351f67cca8291f0404d9ee30f0acf191b926b",
          "message": "ICU-21900 BRS71 Updated serialization test data for 71.1",
          "timestamp": "2022-03-15T09:47:57-04:00",
          "tree_id": "6fec003664bd37e4fd2da820024913a5620c6207",
          "url": "https://github.com/unicode-org/icu/commit/811351f67cca8291f0404d9ee30f0acf191b926b"
        },
        "date": 1647352866697,
        "tool": "ndjson",
        "benches": [
          {
            "name": "titlecase_letter_add",
            "value": 84645.4944,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_contains",
            "value": 140464.333,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_iterator",
            "value": 0.5697,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_add",
            "value": 9.4619,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_contains",
            "value": 5.2539,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_iterator",
            "value": 0,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern1",
            "value": 14640.8183,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern2",
            "value": 49352.795,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern3",
            "value": 2526.8732,
            "unit": "ns/iter",
            "biggerIsBetter": false
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "y.umaoka@gmail.com",
            "name": "yumaoka",
            "username": "yumaoka"
          },
          "committer": {
            "email": "yumaoka@users.noreply.github.com",
            "name": "Yoshito Umaoka",
            "username": "yumaoka"
          },
          "distinct": true,
          "id": "5b4559df24b8b610998b9c3596534dbcf6744bc4",
          "message": "ICU-21900 BRS71 Cleanup import statements in ICU4J",
          "timestamp": "2022-03-15T09:47:25-04:00",
          "tree_id": "710673993a1d12aa96e3404892847295c45f2e07",
          "url": "https://github.com/unicode-org/icu/commit/5b4559df24b8b610998b9c3596534dbcf6744bc4"
        },
        "date": 1647353122908,
        "tool": "ndjson",
        "benches": [
          {
            "name": "titlecase_letter_add",
            "value": 62684.0103,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_contains",
            "value": 105344.61,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_iterator",
            "value": 0.4341,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_add",
            "value": 6.9471,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_contains",
            "value": 3.9598,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_iterator",
            "value": 0,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern1",
            "value": 11548.8962,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern2",
            "value": 46536.1877,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern3",
            "value": 2448.7446,
            "unit": "ns/iter",
            "biggerIsBetter": false
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "pedberg@unicode.org",
            "name": "Peter Edberg",
            "username": "pedberg-icu"
          },
          "committer": {
            "email": "42151464+pedberg-icu@users.noreply.github.com",
            "name": "Peter Edberg",
            "username": "pedberg-icu"
          },
          "distinct": true,
          "id": "dbf7c20be650d9425ba8f25784c3f70b4c07f838",
          "message": "ICU-21942 Fix Kosovo 3-letter code to be XKK for uloc_getISO3Country etc.",
          "timestamp": "2022-03-15T10:59:13-07:00",
          "tree_id": "33cac0a5222e84bdd8a8acd8d8f0092e4f2a2765",
          "url": "https://github.com/unicode-org/icu/commit/dbf7c20be650d9425ba8f25784c3f70b4c07f838"
        },
        "date": 1647367989842,
        "tool": "ndjson",
        "benches": [
          {
            "name": "titlecase_letter_add",
            "value": 60536.0782,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_contains",
            "value": 108601.4249,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_iterator",
            "value": 0.451,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_add",
            "value": 8.3569,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_contains",
            "value": 4.0569,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_iterator",
            "value": 0,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern1",
            "value": 12589.6549,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern2",
            "value": 41950.9995,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern3",
            "value": 2160.1548,
            "unit": "ns/iter",
            "biggerIsBetter": false
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "shaobero@adobe.com",
            "name": "shaobero",
            "username": "shaobero"
          },
          "committer": {
            "email": "markus.icu@gmail.com",
            "name": "Markus Scherer",
            "username": "markusicu"
          },
          "distinct": true,
          "id": "b1269c91211deab8f94c3cf85accb51e5a71ca5c",
          "message": "ICU-21823 Adding changes to fix charset detection incase of no match",
          "timestamp": "2022-03-15T21:47:40Z",
          "tree_id": "4dccceca277645512aea849db22a064750395d60",
          "url": "https://github.com/unicode-org/icu/commit/b1269c91211deab8f94c3cf85accb51e5a71ca5c"
        },
        "date": 1647381721632,
        "tool": "ndjson",
        "benches": [
          {
            "name": "titlecase_letter_add",
            "value": 70109.2137,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_contains",
            "value": 122518.1361,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_iterator",
            "value": 0.4984,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_add",
            "value": 9.3594,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_contains",
            "value": 4.5659,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_iterator",
            "value": 0,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern1",
            "value": 14158.1654,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern2",
            "value": 47662.6429,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern3",
            "value": 2424.7533,
            "unit": "ns/iter",
            "biggerIsBetter": false
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "younies.mahmoud@gmail.com",
            "name": "Younies",
            "username": "younies"
          },
          "committer": {
            "email": "younies@chromium.org",
            "name": "Younies Mahmoud",
            "username": "younies"
          },
          "distinct": true,
          "id": "f30956fc9c9fd9e83189ac1c8b372dea0832eb90",
          "message": "ICU-21840 Fix formatting Aliases\n\nSee #2016",
          "timestamp": "2022-03-15T23:27:43+01:00",
          "tree_id": "effd861fbdf9feda8b88ac7df6e6337ffc160e42",
          "url": "https://github.com/unicode-org/icu/commit/f30956fc9c9fd9e83189ac1c8b372dea0832eb90"
        },
        "date": 1647384114161,
        "tool": "ndjson",
        "benches": [
          {
            "name": "titlecase_letter_add",
            "value": 70230.479,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_contains",
            "value": 117258.9123,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_iterator",
            "value": 0.4742,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_add",
            "value": 7.4696,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_contains",
            "value": 4.2838,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_iterator",
            "value": 0,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern1",
            "value": 11829.7268,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern2",
            "value": 39946.6525,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern3",
            "value": 2064.4373,
            "unit": "ns/iter",
            "biggerIsBetter": false
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "daju@microsoft.com",
            "name": "Daniel Ju",
            "username": "daniel-ju"
          },
          "committer": {
            "email": "41210545+daniel-ju@users.noreply.github.com",
            "name": "Daniel Ju",
            "username": "daniel-ju"
          },
          "distinct": true,
          "id": "741bbddcf9279f41385862be8913ed13b9e342c0",
          "message": "ICU-21900 BRS71RC Update version number and regenerate configure",
          "timestamp": "2022-03-15T18:26:10-05:00",
          "tree_id": "1b2b5e930f41b85f81e6baf2dc1b46dda2462bd9",
          "url": "https://github.com/unicode-org/icu/commit/741bbddcf9279f41385862be8913ed13b9e342c0"
        },
        "date": 1647387551055,
        "tool": "ndjson",
        "benches": [
          {
            "name": "titlecase_letter_add",
            "value": 60549.1078,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_contains",
            "value": 108592.2565,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_iterator",
            "value": 0.4509,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_add",
            "value": 8.3493,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_contains",
            "value": 4.0572,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_iterator",
            "value": 0,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern1",
            "value": 12593.9318,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern2",
            "value": 41956.455,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern3",
            "value": 2159.2983,
            "unit": "ns/iter",
            "biggerIsBetter": false
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "shane@unicode.org",
            "name": "Shane F. Carr",
            "username": "sffc"
          },
          "committer": {
            "email": "shane@unicode.org",
            "name": "Shane F. Carr",
            "username": "sffc"
          },
          "distinct": true,
          "id": "33c9b61b26250e9fe39e098f9f131549d9aa516f",
          "message": "ICU-21871 Make behavior consistent on list format of empty strings",
          "timestamp": "2022-03-15T18:11:57-07:00",
          "tree_id": "fecddd3c2aad1ff68252adb1d70169a10776b5b8",
          "url": "https://github.com/unicode-org/icu/commit/33c9b61b26250e9fe39e098f9f131549d9aa516f"
        },
        "date": 1647393890536,
        "tool": "ndjson",
        "benches": [
          {
            "name": "titlecase_letter_add",
            "value": 60631.6138,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_contains",
            "value": 108678.4844,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_iterator",
            "value": 0.4501,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_add",
            "value": 8.3362,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_contains",
            "value": 4.0589,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_iterator",
            "value": 0,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern1",
            "value": 12601.4315,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern2",
            "value": 41987.9789,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern3",
            "value": 2161.8868,
            "unit": "ns/iter",
            "biggerIsBetter": false
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "pedberg@unicode.org",
            "name": "Peter Edberg",
            "username": "pedberg-icu"
          },
          "committer": {
            "email": "42151464+pedberg-icu@users.noreply.github.com",
            "name": "Peter Edberg",
            "username": "pedberg-icu"
          },
          "distinct": true,
          "id": "633070497465bea1d19d66ad2162a1ec5f4bdda3",
          "message": "ICU-21944 Sync recent uloc_getLanguage/Countries updates to ICU4J; add \"mo\" mapping for C",
          "timestamp": "2022-03-16T09:01:59-07:00",
          "tree_id": "3ddb1ecd0ec14e15c35b4d94a5ec8352fd487ac8",
          "url": "https://github.com/unicode-org/icu/commit/633070497465bea1d19d66ad2162a1ec5f4bdda3"
        },
        "date": 1647447439158,
        "tool": "ndjson",
        "benches": [
          {
            "name": "titlecase_letter_add",
            "value": 53499.6225,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_contains",
            "value": 106143.0259,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_iterator",
            "value": 0.4053,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_add",
            "value": 6.3619,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_contains",
            "value": 3.9651,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_iterator",
            "value": 0,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern1",
            "value": 10888.5,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern2",
            "value": 36200.3769,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern3",
            "value": 1890.9374,
            "unit": "ns/iter",
            "biggerIsBetter": false
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "pedberg@unicode.org",
            "name": "Peter Edberg",
            "username": "pedberg-icu"
          },
          "committer": {
            "email": "42151464+pedberg-icu@users.noreply.github.com",
            "name": "Peter Edberg",
            "username": "pedberg-icu"
          },
          "distinct": true,
          "id": "8575c0dacef68253329608650b25412e6db7ca78",
          "message": "ICU-21900 check non-stable API macros, move class boilerplate out of conditionals",
          "timestamp": "2022-03-16T09:03:05-07:00",
          "tree_id": "a400718b943fe30bfd9da7c0ac9a99ed55899aa7",
          "url": "https://github.com/unicode-org/icu/commit/8575c0dacef68253329608650b25412e6db7ca78"
        },
        "date": 1647447978552,
        "tool": "ndjson",
        "benches": [
          {
            "name": "titlecase_letter_add",
            "value": 80535.5908,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_contains",
            "value": 132688.4417,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_iterator",
            "value": 0.5417,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_add",
            "value": 9.1197,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_contains",
            "value": 4.8217,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_iterator",
            "value": 0,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern1",
            "value": 13228.9776,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern2",
            "value": 45399.6573,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern3",
            "value": 2270.94,
            "unit": "ns/iter",
            "biggerIsBetter": false
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "yumaoka@users.noreply.github.com",
            "name": "Yoshito Umaoka",
            "username": "yumaoka"
          },
          "committer": {
            "email": "yumaoka@users.noreply.github.com",
            "name": "Yoshito Umaoka",
            "username": "yumaoka"
          },
          "distinct": true,
          "id": "89c5d03023d5e96945188bc365a3d15e53441c86",
          "message": "ICU-21900 BRS71 ICU4J API signature file",
          "timestamp": "2022-03-16T12:36:40-04:00",
          "tree_id": "45a430aee8792898a7dc2a9bc6970172d466a6b5",
          "url": "https://github.com/unicode-org/icu/commit/89c5d03023d5e96945188bc365a3d15e53441c86"
        },
        "date": 1647449457081,
        "tool": "ndjson",
        "benches": [
          {
            "name": "titlecase_letter_add",
            "value": 60619.2008,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_contains",
            "value": 120238.9382,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_iterator",
            "value": 0.4623,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_add",
            "value": 7.1187,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_contains",
            "value": 4.4918,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_iterator",
            "value": 0,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern1",
            "value": 12356.2223,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern2",
            "value": 40994.9377,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern3",
            "value": 2144.1049,
            "unit": "ns/iter",
            "biggerIsBetter": false
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "nrunge@google.com",
            "name": "gnrunge",
            "username": "gnrunge"
          },
          "committer": {
            "email": "41129501+gnrunge@users.noreply.github.com",
            "name": "Norbert Runge",
            "username": "gnrunge"
          },
          "distinct": true,
          "id": "0f49e5086850b0a5171000964a07b570749dc1c3",
          "message": "ICU-21843 Increase performance alert threshold to 200% to avoid false alerts\nfrom occasional spikes.",
          "timestamp": "2022-03-17T09:31:53-07:00",
          "tree_id": "ba17dca7ac476bc685815bcd81bb86df6a6f1d95",
          "url": "https://github.com/unicode-org/icu/commit/0f49e5086850b0a5171000964a07b570749dc1c3"
        },
        "date": 1647535514041,
        "tool": "ndjson",
        "benches": [
          {
            "name": "titlecase_letter_add",
            "value": 53483.2018,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_contains",
            "value": 106159.1216,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_iterator",
            "value": 0.4052,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_add",
            "value": 6.9874,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_contains",
            "value": 4.4956,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_iterator",
            "value": 0,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern1",
            "value": 10891.8828,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern2",
            "value": 36206.0775,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern3",
            "value": 1890.3095,
            "unit": "ns/iter",
            "biggerIsBetter": false
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "y.umaoka@gmail.com",
            "name": "yumaoka",
            "username": "yumaoka"
          },
          "committer": {
            "email": "yumaoka@users.noreply.github.com",
            "name": "Yoshito Umaoka",
            "username": "yumaoka"
          },
          "distinct": true,
          "id": "ee6433c297477453bf12cd1cdb83a58ef74aea4e",
          "message": "ICU-21949 tzdata2022a update in ICU",
          "timestamp": "2022-03-17T13:56:20-04:00",
          "tree_id": "e98ba87a01a2366cff5ef67b84a910d40deb71cf",
          "url": "https://github.com/unicode-org/icu/commit/ee6433c297477453bf12cd1cdb83a58ef74aea4e"
        },
        "date": 1647540557899,
        "tool": "ndjson",
        "benches": [
          {
            "name": "titlecase_letter_add",
            "value": 66380.2027,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_contains",
            "value": 112715.9908,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_iterator",
            "value": 0.4393,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_add",
            "value": 7.783,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_contains",
            "value": 4.1382,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_iterator",
            "value": 0,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern1",
            "value": 11310.8461,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern2",
            "value": 37640.8159,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern3",
            "value": 1943.3163,
            "unit": "ns/iter",
            "biggerIsBetter": false
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "y.umaoka@gmail.com",
            "name": "yumaoka",
            "username": "yumaoka"
          },
          "committer": {
            "email": "yumaoka@users.noreply.github.com",
            "name": "Yoshito Umaoka",
            "username": "yumaoka"
          },
          "distinct": true,
          "id": "ee6433c297477453bf12cd1cdb83a58ef74aea4e",
          "message": "ICU-21949 tzdata2022a update in ICU",
          "timestamp": "2022-03-17T13:56:20-04:00",
          "tree_id": "e98ba87a01a2366cff5ef67b84a910d40deb71cf",
          "url": "https://github.com/unicode-org/icu/commit/ee6433c297477453bf12cd1cdb83a58ef74aea4e"
        },
        "date": 1647542965896,
        "tool": "ndjson",
        "benches": [
          {
            "name": "titlecase_letter_add",
            "value": 80963.7407,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_contains",
            "value": 135387.4491,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_iterator",
            "value": 0.5299,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_add",
            "value": 9.2373,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_contains",
            "value": 5.144,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_iterator",
            "value": 0,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern1",
            "value": 13998.4076,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern2",
            "value": 47832.3753,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern3",
            "value": 2419.636,
            "unit": "ns/iter",
            "biggerIsBetter": false
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "daju@microsoft.com",
            "name": "Daniel Ju",
            "username": "daniel-ju"
          },
          "committer": {
            "email": "41210545+daniel-ju@users.noreply.github.com",
            "name": "Daniel Ju",
            "username": "daniel-ju"
          },
          "distinct": true,
          "id": "09331b75bf4eba38e9e4eb3c06109c54ad940dd4",
          "message": "ICU-21901 BRS71GA Update version number",
          "timestamp": "2022-03-21T15:01:26-05:00",
          "tree_id": "5a68777dbd795812fe73f8d7d51314dfe6a1d6dd",
          "url": "https://github.com/unicode-org/icu/commit/09331b75bf4eba38e9e4eb3c06109c54ad940dd4"
        },
        "date": 1647893759709,
        "tool": "ndjson",
        "benches": [
          {
            "name": "titlecase_letter_add",
            "value": 84258.1895,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_contains",
            "value": 141336.3622,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_iterator",
            "value": 0.5571,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_add",
            "value": 9.8287,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_contains",
            "value": 5.1511,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_iterator",
            "value": 0,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern1",
            "value": 13863.593,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern2",
            "value": 47350.5066,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern3",
            "value": 2397.0865,
            "unit": "ns/iter",
            "biggerIsBetter": false
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "29107334+jefgen@users.noreply.github.com",
            "name": "Jeff Genovy",
            "username": "jefgen"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "1d9cc717e2b93b8b27b84b2969c3bfc9a4d0a593",
          "message": "ICU-21956 Merge maint-71 to main\n\nMerging the maint/maint-71 branch into the main branch.",
          "timestamp": "2022-03-23T12:50:13-07:00",
          "tree_id": "5a68777dbd795812fe73f8d7d51314dfe6a1d6dd",
          "url": "https://github.com/unicode-org/icu/commit/1d9cc717e2b93b8b27b84b2969c3bfc9a4d0a593"
        },
        "date": 1648065813899,
        "tool": "ndjson",
        "benches": [
          {
            "name": "titlecase_letter_add",
            "value": 72151.5047,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_contains",
            "value": 140643.4988,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_iterator",
            "value": 0.5444,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_add",
            "value": 8.4641,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_contains",
            "value": 5.2431,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_iterator",
            "value": 0,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern1",
            "value": 14443.2139,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern2",
            "value": 47969.5207,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern3",
            "value": 2480.4615,
            "unit": "ns/iter",
            "biggerIsBetter": false
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "pedberg@unicode.org",
            "name": "Peter Edberg",
            "username": "pedberg-icu"
          },
          "committer": {
            "email": "42151464+pedberg-icu@users.noreply.github.com",
            "name": "Peter Edberg",
            "username": "pedberg-icu"
          },
          "distinct": true,
          "id": "9b3c0c328c78d5ea74bfdff9026f31e91b173c0b",
          "message": "ICU-21901 integrate CLDR release-41-beta2 to ICU main for 71ga",
          "timestamp": "2022-03-23T16:43:02-07:00",
          "tree_id": "aea6b6784ef5f219025dc77f8d8bf48d19777bc9",
          "url": "https://github.com/unicode-org/icu/commit/9b3c0c328c78d5ea74bfdff9026f31e91b173c0b"
        },
        "date": 1648079818378,
        "tool": "ndjson",
        "benches": [
          {
            "name": "titlecase_letter_add",
            "value": 60626.6764,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_contains",
            "value": 120316.0883,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_iterator",
            "value": 0.4594,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_add",
            "value": 7.2131,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_contains",
            "value": 4.4949,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_iterator",
            "value": 0,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern1",
            "value": 12341.737,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern2",
            "value": 41013.2305,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern3",
            "value": 2147.5645,
            "unit": "ns/iter",
            "biggerIsBetter": false
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "markus.icu@gmail.com",
            "name": "Markus Scherer",
            "username": "markusicu"
          },
          "committer": {
            "email": "markus.icu@gmail.com",
            "name": "Markus Scherer",
            "username": "markusicu"
          },
          "distinct": true,
          "id": "2aa2a7221c2d28c331ffbe0209b74d3156bbe312",
          "message": "ICU-21953 remove outdated ucdterms.txt\n\nThis is an old version of the Unicode license from 2004,\nwhen the ICU license was different from the Unicode license.\n\nWe should have removed this file in 2016,\nwhen the Unicode license was revised,\nand when the ICU project became a project of the Unicode Consortium,\nadopting the Unicode license for all of ICU.\n\nSince 2016, the Unicode data files are covered by the same license as the\ntop license text in the ICU LICENSE file.",
          "timestamp": "2022-03-24T00:14:02Z",
          "tree_id": "1ceb57fa15c77488db9f7db1a5f553c0d902a004",
          "url": "https://github.com/unicode-org/icu/commit/2aa2a7221c2d28c331ffbe0209b74d3156bbe312"
        },
        "date": 1648081595510,
        "tool": "ndjson",
        "benches": [
          {
            "name": "titlecase_letter_add",
            "value": 60656.8951,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_contains",
            "value": 120313.9126,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_iterator",
            "value": 0.4594,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_add",
            "value": 7.2117,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_contains",
            "value": 4.4947,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_iterator",
            "value": 0,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern1",
            "value": 12331.465,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern2",
            "value": 41011.3355,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern3",
            "value": 2141.156,
            "unit": "ns/iter",
            "biggerIsBetter": false
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "markus.icu@gmail.com",
            "name": "Markus Scherer",
            "username": "markusicu"
          },
          "committer": {
            "email": "markus.icu@gmail.com",
            "name": "Markus Scherer",
            "username": "markusicu"
          },
          "distinct": true,
          "id": "ed1d9efc153bce41d61dd10b0ee4641b8513c431",
          "message": "ICU-21954 LICENSE: add more license texts from icu4c files",
          "timestamp": "2022-03-24T21:22:05Z",
          "tree_id": "95b674daae808a0ca19eb48d26139fbd81742c43",
          "url": "https://github.com/unicode-org/icu/commit/ed1d9efc153bce41d61dd10b0ee4641b8513c431"
        },
        "date": 1648157866906,
        "tool": "ndjson",
        "benches": [
          {
            "name": "titlecase_letter_add",
            "value": 52819.0135,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_contains",
            "value": 104014.9083,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_iterator",
            "value": 0.3907,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_add",
            "value": 6.2247,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_contains",
            "value": 3.9001,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_iterator",
            "value": 0,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern1",
            "value": 10611.8543,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern2",
            "value": 35324.2067,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern3",
            "value": 1848.4165,
            "unit": "ns/iter",
            "biggerIsBetter": false
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "srl295@gmail.com",
            "name": "Steven R. Loomis",
            "username": "srl295"
          },
          "committer": {
            "email": "srl295@gmail.com",
            "name": "Steven R. Loomis",
            "username": "srl295"
          },
          "distinct": true,
          "id": "2612b8b55af90106c11422a3558006bdc8016bc4",
          "message": "ICU-21965 fix utilities.jar module name\n\ncom.ibm.icu.utilities - otherwise the automatic module name is unusable",
          "timestamp": "2022-03-30T11:09:53-05:00",
          "tree_id": "c25c55651b6b9eedb525e2eafeff337ca86dedcb",
          "url": "https://github.com/unicode-org/icu/commit/2612b8b55af90106c11422a3558006bdc8016bc4"
        },
        "date": 1648657488495,
        "tool": "ndjson",
        "benches": [
          {
            "name": "titlecase_letter_add",
            "value": 82682.5404,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_contains",
            "value": 137829.1798,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_iterator",
            "value": 0.5379,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_add",
            "value": 9.6469,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_contains",
            "value": 5.1306,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_iterator",
            "value": 0,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern1",
            "value": 14245.0682,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern2",
            "value": 48680.8103,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern3",
            "value": 2453.1323,
            "unit": "ns/iter",
            "biggerIsBetter": false
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "shane@unicode.org",
            "name": "Shane Carr",
            "username": "sffc"
          },
          "committer": {
            "email": "shane@unicode.org",
            "name": "Shane F. Carr",
            "username": "sffc"
          },
          "distinct": true,
          "id": "b144aac447e4ddbc20cbec90ed625ef983a64fd9",
          "message": "ICU-21762 Export Script_Extensions with --all flag in icuexportdata\n\nSee #2054",
          "timestamp": "2022-03-30T11:44:02-07:00",
          "tree_id": "9f2a01db8caee468c31e2289b4569774b0bebc48",
          "url": "https://github.com/unicode-org/icu/commit/b144aac447e4ddbc20cbec90ed625ef983a64fd9"
        },
        "date": 1648666691154,
        "tool": "ndjson",
        "benches": [
          {
            "name": "titlecase_letter_add",
            "value": 70620.8317,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_contains",
            "value": 500833.297,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_iterator",
            "value": 1.4734,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_add",
            "value": 18.6107,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_contains",
            "value": 18.7944,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_iterator",
            "value": 0.0001,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern1",
            "value": 14740.6115,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern2",
            "value": 48825.4161,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern3",
            "value": 2578.5054,
            "unit": "ns/iter",
            "biggerIsBetter": false
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "y.umaoka@gmail.com",
            "name": "yumaoka",
            "username": "yumaoka"
          },
          "committer": {
            "email": "42151464+pedberg-icu@users.noreply.github.com",
            "name": "Peter Edberg",
            "username": "pedberg-icu"
          },
          "distinct": true,
          "id": "c205e7ee49a7086a28b9c275fcfdac9ca3dc815d",
          "message": "ICU-21971 Added a new numeric currecny code SLE/695 for Sierra Leone Leone.",
          "timestamp": "2022-03-30T13:49:51-07:00",
          "tree_id": "f4b713638cc22c33d7948a0c67f139597d39895e",
          "url": "https://github.com/unicode-org/icu/commit/c205e7ee49a7086a28b9c275fcfdac9ca3dc815d"
        },
        "date": 1648674262511,
        "tool": "ndjson",
        "benches": [
          {
            "name": "titlecase_letter_add",
            "value": 69704.1236,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_contains",
            "value": 136825.8515,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_iterator",
            "value": 0.5074,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_add",
            "value": 7.6528,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_contains",
            "value": 4.9181,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_iterator",
            "value": 0,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern1",
            "value": 13139.0701,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern2",
            "value": 43477.8134,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern3",
            "value": 2277.244,
            "unit": "ns/iter",
            "biggerIsBetter": false
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "29107334+jefgen@users.noreply.github.com",
            "name": "Jeff Genovy",
            "username": "jefgen"
          },
          "committer": {
            "email": "29107334+jefgen@users.noreply.github.com",
            "name": "Jeff Genovy",
            "username": "jefgen"
          },
          "distinct": true,
          "id": "861e55c246bf56867699a11d274c1875e0690fcc",
          "message": "ICU-21972 Use a shared props file for the ICU Major Version number in the Windows Visual Studio project files.",
          "timestamp": "2022-03-30T20:55:36-07:00",
          "tree_id": "69b9145357b51f281cc1709e50a968a3b0498b49",
          "url": "https://github.com/unicode-org/icu/commit/861e55c246bf56867699a11d274c1875e0690fcc"
        },
        "date": 1648699765708,
        "tool": "ndjson",
        "benches": [
          {
            "name": "titlecase_letter_add",
            "value": 53406.749,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_contains",
            "value": 105969.0993,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_iterator",
            "value": 0.4055,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_add",
            "value": 6.3573,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_contains",
            "value": 3.9619,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_iterator",
            "value": 0,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern1",
            "value": 10865.8578,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern2",
            "value": 36201.7194,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern3",
            "value": 1891.1597,
            "unit": "ns/iter",
            "biggerIsBetter": false
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "jubrianc@microsoft.com",
            "name": "Julien Brianceau",
            "username": "jbrianceau"
          },
          "committer": {
            "email": "29107334+jefgen@users.noreply.github.com",
            "name": "Jeff Genovy",
            "username": "jefgen"
          },
          "distinct": true,
          "id": "a2c90781f14869f6fbd9267d03e155efa192b245",
          "message": "ICU-21967 Remove obsolete references in makedata.vcxproj and makedata_uwp.vcxproj\n\nThese references should have been removed in ICU-20489 and ICU-21420.\nTake the opportunity to update the doc as well.",
          "timestamp": "2022-03-31T11:23:29-07:00",
          "tree_id": "f609c16843cff6482f6dd06be11b759537e87d3b",
          "url": "https://github.com/unicode-org/icu/commit/a2c90781f14869f6fbd9267d03e155efa192b245"
        },
        "date": 1648751786223,
        "tool": "ndjson",
        "benches": [
          {
            "name": "titlecase_letter_add",
            "value": 74081.9634,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_contains",
            "value": 124470.3779,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_iterator",
            "value": 0.4838,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_add",
            "value": 8.1552,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_contains",
            "value": 4.5639,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_iterator",
            "value": 0,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern1",
            "value": 11808.3913,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern2",
            "value": 41270.6877,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern3",
            "value": 2185.2525,
            "unit": "ns/iter",
            "biggerIsBetter": false
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "daju@microsoft.com",
            "name": "Daniel Ju",
            "username": "daniel-ju"
          },
          "committer": {
            "email": "41210545+daniel-ju@users.noreply.github.com",
            "name": "Daniel Ju",
            "username": "daniel-ju"
          },
          "distinct": true,
          "id": "f4f74c1f2ee380c20434f224d7fea05fdb4e91d6",
          "message": "ICU-21957 BRS72RC Update version number to 72.0.1",
          "timestamp": "2022-03-31T16:39:13-07:00",
          "tree_id": "490d3bcef2c5aed9fa04a64e006f6eea14f5098b",
          "url": "https://github.com/unicode-org/icu/commit/f4f74c1f2ee380c20434f224d7fea05fdb4e91d6"
        },
        "date": 1648770713077,
        "tool": "ndjson",
        "benches": [
          {
            "name": "titlecase_letter_add",
            "value": 52322.9442,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_contains",
            "value": 102639.6935,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_iterator",
            "value": 0.3689,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_add",
            "value": 6.1369,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_contains",
            "value": 3.8289,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_iterator",
            "value": 0,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern1",
            "value": 10547.61,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern2",
            "value": 34955.2756,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern3",
            "value": 1841.0275,
            "unit": "ns/iter",
            "biggerIsBetter": false
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "markus.icu@gmail.com",
            "name": "Markus Scherer",
            "username": "markusicu"
          },
          "committer": {
            "email": "markus.icu@gmail.com",
            "name": "Markus Scherer",
            "username": "markusicu"
          },
          "distinct": true,
          "id": "4833cc89b2fae2e8863b46bf1dc785964847e882",
          "message": "ICU-20715 CollationDataBuilder reset outdated prefix+contraction values\n\nSee #2052",
          "timestamp": "2022-04-04T16:10:13Z",
          "tree_id": "32748a15222ff1509cad57b04d3294c0f402e8df",
          "url": "https://github.com/unicode-org/icu/commit/4833cc89b2fae2e8863b46bf1dc785964847e882"
        },
        "date": 1649089453488,
        "tool": "ndjson",
        "benches": [
          {
            "name": "titlecase_letter_add",
            "value": 72697.4,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_contains",
            "value": 144021.3397,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_iterator",
            "value": 0.5199,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_add",
            "value": 8.6232,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_contains",
            "value": 5.3741,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_iterator",
            "value": 0,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern1",
            "value": 14763.3978,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern2",
            "value": 49170.4366,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern3",
            "value": 2565.9334,
            "unit": "ns/iter",
            "biggerIsBetter": false
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "ftang@chromium.org",
            "name": "Frank Yung-Fong Tang",
            "username": "FrankYFTang"
          },
          "committer": {
            "email": "ftang@google.com",
            "name": "Frank Yung-Fong Tang",
            "username": "FrankYFTang"
          },
          "distinct": true,
          "id": "4747484273dc65a18a0469aca4d36840d64c10c6",
          "message": "ICU-21966 Cleanup -Wunused-but-set-variable\n\nSee #2055",
          "timestamp": "2022-04-06T12:51:46-07:00",
          "tree_id": "61c6000acd9127af32ccdebbe58a5458d0f63962",
          "url": "https://github.com/unicode-org/icu/commit/4747484273dc65a18a0469aca4d36840d64c10c6"
        },
        "date": 1649275553763,
        "tool": "ndjson",
        "benches": [
          {
            "name": "titlecase_letter_add",
            "value": 81292.6139,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_contains",
            "value": 135344.646,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_iterator",
            "value": 0.5446,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_add",
            "value": 9.4297,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_contains",
            "value": 5.0374,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_iterator",
            "value": 0,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern1",
            "value": 13910.6783,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern2",
            "value": 48073.2429,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern3",
            "value": 2406.2534,
            "unit": "ns/iter",
            "biggerIsBetter": false
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "62772518+richgillam@users.noreply.github.com",
            "name": "Rich Gillam",
            "username": "richgillam"
          },
          "committer": {
            "email": "62772518+richgillam@users.noreply.github.com",
            "name": "Rich Gillam",
            "username": "richgillam"
          },
          "distinct": true,
          "id": "87cee860e035e93cee30cc0dab1be8a697f42646",
          "message": "ICU-21984 Fix DateIntervalFormat.normalizeHourMetacharacters() so that it doesn't require the hour and day-period\nfields to appear in any particular order or position in the skeleton string.",
          "timestamp": "2022-04-11T14:37:15-07:00",
          "tree_id": "9d15834932f32762c8a0a350e9263a8dd2a38900",
          "url": "https://github.com/unicode-org/icu/commit/87cee860e035e93cee30cc0dab1be8a697f42646"
        },
        "date": 1649713816558,
        "tool": "ndjson",
        "benches": [
          {
            "name": "titlecase_letter_add",
            "value": 71031.9407,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_contains",
            "value": 137979.1692,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_iterator",
            "value": 0.503,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_add",
            "value": 8.2782,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_contains",
            "value": 5.1721,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_iterator",
            "value": 0,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern1",
            "value": 14192.2898,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern2",
            "value": 47436.8321,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern3",
            "value": 2462.4805,
            "unit": "ns/iter",
            "biggerIsBetter": false
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "62772518+richgillam@users.noreply.github.com",
            "name": "Rich Gillam",
            "username": "richgillam"
          },
          "committer": {
            "email": "42151464+pedberg-icu@users.noreply.github.com",
            "name": "Peter Edberg",
            "username": "pedberg-icu"
          },
          "distinct": true,
          "id": "131146a5f43955eee68693e1e627df13da1ae384",
          "message": "ICU-21984 Fix DateIntervalFormat.normalizeHourMetacharacters() so that it doesn't require the hour and day-period\nfields to appear in any particular order or position in the skeleton string.",
          "timestamp": "2022-04-14T14:21:02-07:00",
          "tree_id": "fb805e6034ebad2b48accba6256dbdf1297371ac",
          "url": "https://github.com/unicode-org/icu/commit/131146a5f43955eee68693e1e627df13da1ae384"
        },
        "date": 1649972093161,
        "tool": "ndjson",
        "benches": [
          {
            "name": "titlecase_letter_add",
            "value": 60451.5164,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_contains",
            "value": 120266.7254,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_iterator",
            "value": 0.4615,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_add",
            "value": 7.2075,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_contains",
            "value": 4.4917,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_iterator",
            "value": 0,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern1",
            "value": 12314.2413,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern2",
            "value": 41054.3994,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern3",
            "value": 2142.2161,
            "unit": "ns/iter",
            "biggerIsBetter": false
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "shane@unicode.org",
            "name": "Shane F. Carr",
            "username": "sffc"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "47824c5568f0a1528c44e5264cb65e9e18705c18",
          "message": "ICU-21956 Merge maint-71 to main",
          "timestamp": "2022-04-14T17:45:38-07:00",
          "tree_id": "b53a205780b474ed928dcf2732513ac8de8743a6",
          "url": "https://github.com/unicode-org/icu/commit/47824c5568f0a1528c44e5264cb65e9e18705c18"
        },
        "date": 1649984306235,
        "tool": "ndjson",
        "benches": [
          {
            "name": "titlecase_letter_add",
            "value": 60643.8283,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_contains",
            "value": 120254.6925,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_iterator",
            "value": 0.4349,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_add",
            "value": 7.2089,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_contains",
            "value": 4.4921,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_iterator",
            "value": 0,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern1",
            "value": 12321.2566,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern2",
            "value": 41019.1602,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern3",
            "value": 2140.7522,
            "unit": "ns/iter",
            "biggerIsBetter": false
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "ftang@chromium.org",
            "name": "Frank Tang",
            "username": "FrankYFTang"
          },
          "committer": {
            "email": "ftang@google.com",
            "name": "Frank Yung-Fong Tang",
            "username": "FrankYFTang"
          },
          "distinct": true,
          "id": "fca6b342c03d89998eba227d284e232dabbfab47",
          "message": "ICU-21994 Fix heap-buffer-overflow",
          "timestamp": "2022-04-20T12:03:35-07:00",
          "tree_id": "09972e260fbe59552e69bb75887d064410144398",
          "url": "https://github.com/unicode-org/icu/commit/fca6b342c03d89998eba227d284e232dabbfab47"
        },
        "date": 1650482218004,
        "tool": "ndjson",
        "benches": [
          {
            "name": "titlecase_letter_add",
            "value": 60853.2891,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_contains",
            "value": 120259.6538,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_iterator",
            "value": 0.4354,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_add",
            "value": 7.2103,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_contains",
            "value": 4.4927,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_iterator",
            "value": 0,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern1",
            "value": 12326.0175,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern2",
            "value": 41021.1365,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern3",
            "value": 2143.8425,
            "unit": "ns/iter",
            "biggerIsBetter": false
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "17109322+hugovdm@users.noreply.github.com",
            "name": "Hugo van der Merwe",
            "username": "hugovdm"
          },
          "committer": {
            "email": "17109322+hugovdm@users.noreply.github.com",
            "name": "Hugo van der Merwe",
            "username": "hugovdm"
          },
          "distinct": true,
          "id": "50e14fe15bcde3311f3e76bb196977a0724d7e8b",
          "message": "ICU-21959 Update stale Jira tickets in ICU4J TODOs\n\nSee #2062",
          "timestamp": "2022-04-27T23:31:46+02:00",
          "tree_id": "320adf839470614e0950cfe770d84936a3fe9df2",
          "url": "https://github.com/unicode-org/icu/commit/50e14fe15bcde3311f3e76bb196977a0724d7e8b"
        },
        "date": 1651095877735,
        "tool": "ndjson",
        "benches": [
          {
            "name": "titlecase_letter_add",
            "value": 53507.8969,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_contains",
            "value": 106163.7061,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_iterator",
            "value": 0.4372,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_add",
            "value": 6.3638,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_contains",
            "value": 3.9653,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_iterator",
            "value": 0,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern1",
            "value": 10868.3443,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern2",
            "value": 36216.3696,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern3",
            "value": 1893.8625,
            "unit": "ns/iter",
            "biggerIsBetter": false
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "cwcornelius@gmail.com",
            "name": "Craig Cornelius",
            "username": "sven-oly"
          },
          "committer": {
            "email": "cwcornelius@gmail.com",
            "name": "Craig Cornelius",
            "username": "sven-oly"
          },
          "distinct": true,
          "id": "cb6b778e1b5ef6a1bb82e085aaf427fc086331c9",
          "message": "ICU-21959 Online demos how to update\n\nSee #2069",
          "timestamp": "2022-04-29T09:36:51-07:00",
          "tree_id": "0e8fc014a5ef382a0bcb4e65b3f1013839bed3db",
          "url": "https://github.com/unicode-org/icu/commit/cb6b778e1b5ef6a1bb82e085aaf427fc086331c9"
        },
        "date": 1651251030875,
        "tool": "ndjson",
        "benches": [
          {
            "name": "titlecase_letter_add",
            "value": 57776.4909,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_contains",
            "value": 129873.7993,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_iterator",
            "value": 0.4404,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_add",
            "value": 6.9542,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_contains",
            "value": 4.8518,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_iterator",
            "value": 0,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern1",
            "value": 11322.751,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern2",
            "value": 39073.6431,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern3",
            "value": 1945.8291,
            "unit": "ns/iter",
            "biggerIsBetter": false
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "markus.icu@gmail.com",
            "name": "Markus Scherer",
            "username": "markusicu"
          },
          "committer": {
            "email": "markus.icu@gmail.com",
            "name": "Markus Scherer",
            "username": "markusicu"
          },
          "distinct": true,
          "id": "43d082665e72d853ef66626e0b17470722776497",
          "message": "ICU-22006 icupkg: %%ALIAS & %%Parent do not need truncation parent",
          "timestamp": "2022-04-29T17:50:11Z",
          "tree_id": "cc8b7de3a086a733ec693be2cd739669cd6d57c9",
          "url": "https://github.com/unicode-org/icu/commit/43d082665e72d853ef66626e0b17470722776497"
        },
        "date": 1651255375937,
        "tool": "ndjson",
        "benches": [
          {
            "name": "titlecase_letter_add",
            "value": 73162.825,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_contains",
            "value": 144179.427,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_iterator",
            "value": 0.5246,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_add",
            "value": 8.6524,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_contains",
            "value": 5.369,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_iterator",
            "value": 0,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern1",
            "value": 14713.669,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern2",
            "value": 49049.8865,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern3",
            "value": 2561.23,
            "unit": "ns/iter",
            "biggerIsBetter": false
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "markus.icu@gmail.com",
            "name": "Markus Scherer",
            "username": "markusicu"
          },
          "committer": {
            "email": "markus.icu@gmail.com",
            "name": "Markus Scherer",
            "username": "markusicu"
          },
          "distinct": true,
          "id": "505535813fd539800de0930883cdb0e0ba678842",
          "message": "ICU-22007 remove outdated terms of use from Unicode conversion files",
          "timestamp": "2022-04-29T19:51:01Z",
          "tree_id": "0648d877b9f7113b462aa8be66a35844db09208a",
          "url": "https://github.com/unicode-org/icu/commit/505535813fd539800de0930883cdb0e0ba678842"
        },
        "date": 1651262675557,
        "tool": "ndjson",
        "benches": [
          {
            "name": "titlecase_letter_add",
            "value": 53347.1883,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_contains",
            "value": 106162.2704,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "titlecase_letter_iterator",
            "value": 0.3856,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_add",
            "value": 6.3641,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_contains",
            "value": 3.9661,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "unassigned_iterator",
            "value": 0,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern1",
            "value": 10872.572,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern2",
            "value": 36199.89,
            "unit": "ns/iter",
            "biggerIsBetter": false
          },
          {
            "name": "pattern3",
            "value": 1891.838,
            "unit": "ns/iter",
            "biggerIsBetter": false
          }
        ]
      }
    ]
  }
}